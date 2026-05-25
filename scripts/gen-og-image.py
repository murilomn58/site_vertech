"""
Gera /public/images/og-image.png 1200x630 pra OpenGraph (WhatsApp/FB/iMessage).

Layout:
  ESQUERDA (0..600): logo Vertech D2-3D quadrada cabendo na altura 630
  DIREITA  (600..1200): texto "VERTECH" branco + "Solucoes" cyan + tagline

Cores: navy #0F172A / cyan #22D3EE / cyan-dark #0891B2
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
LOGO_SRC = Path.home() / "Downloads" / "vertech-avatar-D2-3D-medio.png"  # original D2 1080x1080
OUT = ROOT / "public" / "images" / "og-image.png"

W, H = 1200, 630
NAVY = (15, 23, 42)
NAVY_DEEP = (8, 13, 26)
CYAN = (34, 211, 238)
WHITE = (255, 255, 255)

FONT_BLACK = "C:/Windows/Fonts/seguibl.ttf"   # Segoe UI Black
FONT_BOLD = "C:/Windows/Fonts/arialbd.ttf"    # Arial Bold
FONT_REG = "C:/Windows/Fonts/segoeui.ttf"     # Segoe UI Regular


def make_gradient_bg() -> Image.Image:
    """Fundo gradient diagonal navy escuro → navy + glow cyan top-left."""
    bg = Image.new("RGB", (W, H), NAVY)
    px = bg.load()
    for y in range(H):
        for x in range(W):
            # gradient diagonal: top-left mais claro (rumo a NAVY), bottom-right mais escuro (NAVY_DEEP)
            t = (x + y) / (W + H)  # 0..1
            r = int(NAVY[0] * (1 - t) + NAVY_DEEP[0] * t)
            g = int(NAVY[1] * (1 - t) + NAVY_DEEP[1] * t)
            b = int(NAVY[2] * (1 - t) + NAVY_DEEP[2] * t)
            px[x, y] = (r, g, b)

    # Glow cyan radial soft no topo-esquerdo
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    cx, cy = 200, 180
    for r in range(450, 0, -8):
        alpha = int(40 * (1 - r / 450) ** 2)
        gdraw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*CYAN, alpha))
    glow = glow.filter(ImageFilter.GaussianBlur(60))
    bg = bg.convert("RGBA")
    bg.alpha_composite(glow)
    return bg.convert("RGB")


def paste_logo(canvas: Image.Image) -> None:
    """Extrai SO o V cyan da D2 (sem o texto VERTECH/SOLUCOES que ja vem na logo)
    e cola na esquerda. Usa chroma-key pra remover o bg navy e blendar com gradient."""
    logo = Image.open(LOGO_SRC).convert("RGBA")

    # Crop: so a regiao do V (y=180..720 da D2 1080x1080)
    v_only = logo.crop((180, 180, 900, 720))  # box (left, top, right, bottom) = 720x540

    # Remove o background navy escuro deixando so o V cyan visivel
    # qualquer pixel proximo do navy (<60 R/G/B medio) vira transparente
    px = v_only.load()
    for y in range(v_only.height):
        for x in range(v_only.width):
            r, g, b, a = px[x, y]
            # navy / azul-escuro background → alpha 0
            if r < 60 and g < 60 and b < 90:
                px[x, y] = (r, g, b, 0)
            # transicao suave nos pixels intermediarios
            elif r < 100 and g < 130 and b < 160 and b > r + 30:
                # blend parcial
                alpha = max(0, min(255, (r + g + b) - 200))
                px[x, y] = (r, g, b, alpha)

    # Resize pra caber: altura alvo 460 (com padding 85px top/bot)
    target_h = 460
    scale = target_h / v_only.height
    target_w = int(v_only.width * scale)
    v_only = v_only.resize((target_w, target_h), Image.LANCZOS)

    x = 80
    y = (H - target_h) // 2
    canvas.paste(v_only, (x, y), v_only)


def draw_text(canvas: Image.Image) -> None:
    draw = ImageDraw.Draw(canvas)
    text_x = 720

    # VERTECH em branco grande
    f_big = ImageFont.truetype(FONT_BLACK, 96)
    draw.text((text_x, 150), "VERTECH", font=f_big, fill=WHITE)

    # Solucoes em cyan medio
    f_med = ImageFont.truetype(FONT_BOLD, 58)
    draw.text((text_x + 4, 260), "Soluções", font=f_med, fill=CYAN)

    # underline cyan curta
    draw.rectangle([text_x + 6, 350, text_x + 80, 354], fill=CYAN)

    # Tagline branca
    f_small = ImageFont.truetype(FONT_REG, 30)
    draw.text((text_x + 6, 380), "IA · Apps · Automação", font=f_small, fill=(220, 230, 245))
    draw.text((text_x + 6, 422), "sob medida pra sua empresa", font=f_small, fill=(180, 195, 215))

    # URL embaixo
    f_url = ImageFont.truetype(FONT_BOLD, 26)
    draw.text((text_x + 6, 490), "vertechsolucoes.com.br", font=f_url, fill=CYAN)


def main():
    canvas = make_gradient_bg()
    paste_logo(canvas)
    draw_text(canvas)

    # Salva com compressao
    canvas.save(OUT, "PNG", optimize=True)
    size_kb = OUT.stat().st_size / 1024
    print(f"[OK] {OUT} ({W}x{H}, {size_kb:.0f} KB)")


if __name__ == "__main__":
    main()
