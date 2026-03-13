"use client";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";

type FounderCardProps = {
  name: string;
  role: string;
  education: string;
  educationFull: string;
  achievements: string[];
  photo: string;
  linkedin: string;
  linkedinText: string;
};

export default function FounderCard(props: FounderCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
        <Image
          src={`/images/${props.photo}`}
          alt={props.name}
          width={400}
          height={400}
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8+P5ZPQAI8wNPk43jYgAAAABJRU5ErkJggg=="
        />
      </div>
      <h3 className="font-heading font-bold text-xl text-navy text-center">{props.name}</h3>
      <p className="text-cyan text-center font-heading font-semibold">{props.role}</p>
      <p className="text-navy/70 text-sm text-center mt-1">{props.education}</p>
      <p className="text-navy/50 text-xs text-center">{props.educationFull}</p>
      <ul className="mt-4 space-y-1">
        {props.achievements.map((a, i) => (
          <li key={i} className="text-sm text-navy/80 flex items-start gap-2">
            <span className="text-cyan mt-0.5">&#10003;</span> {a}
          </li>
        ))}
      </ul>
      <a
        href={props.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-navy/5 text-navy hover:bg-navy/10 font-heading text-sm transition-colors"
      >
        {props.linkedinText}
      </a>
    </motion.div>
  );
}
