import { Container } from "@/components/shared/Container";
import {
  Facebook,
  Globe2,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Newspaper,
  Phone,
  Send,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const contactItems = [
  { label: "WhatsApp", value: "+593 998 037 473", icon: MessageCircle },
  { label: "Phone", value: "+593 998 037 473", icon: Phone },
  { label: "Email", value: "info@vidaverde.com", icon: Mail },
  { label: "Website", value: "vidaverde.com", icon: Globe2 },
  {
    label: "Address",
    value: "Mallorca N24-55 y Barcelona, Quito",
    icon: MapPin,
  },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "YouTube", href: "#", icon: Youtube },
];

const latestPosts = [
  {
    title: "Spanish immersion in Quito",
    tag: "Courses",
    excerpt: "How one-on-one lessons help students build confidence faster.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=240&q=80",
  },
  {
    title: "Living with a host family",
    tag: "Homestay",
    excerpt: "A closer look at daily life, meals, and conversation practice.",
    image:
      "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=240&q=80",
  },
  {
    title: "Weekend culture in Ecuador",
    tag: "Activities",
    excerpt: "Markets, mountains, and local traditions around Quito.",
    image:
      "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=240&q=80",
  },
];

export default function Footer() {
  return (
    <footer className="foot" data-screen-label="Footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-col">
            <FooterHeading icon={Leaf}>ABOUT US</FooterHeading>
            <p className="footer-about">
              Vida Verde Centro de Espanol is a Spanish school in Quito,
              Ecuador, offering immersion courses, homestays, and cultural
              experiences for students from around the world.
            </p>
            <ul className="footer-contact-list">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <Icon aria-hidden="true" />
                    <span>
                      <strong>{item.label}</strong>
                      {item.value}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="footer-socials" aria-label="Social media links">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.label} href={item.href} aria-label={item.label}>
                    <Icon aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="footer-col">
            <FooterHeading icon={Newspaper}>Latest POSTS</FooterHeading>
            <div className="footer-posts">
              {latestPosts.map((post) => (
                <article className="footer-post" key={post.title}>
                  <Image
                    src={post.image}
                    alt=""
                    width={92}
                    height={92}
                    className="footer-post-thumb"
                    unoptimized
                  />
                  <div>
                    <div className="footer-post-tag">{post.tag}</div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <FooterHeading icon={Send}>CONTACTS</FooterHeading>
            <form className="footer-form">
              <input type="text" name="name" placeholder="Name" aria-label="Name" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                aria-label="Email"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                aria-label="Phone"
              />
              <textarea
                name="message"
                placeholder="Message"
                aria-label="Message"
                rows={5}
              />
              <button className="vv-btn vv-btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bar">
          Copyrights 2018 Vida Verde Centro de Español © Designed by NetCom.EC
        </div>
      </Container>
    </footer>
  );
}

function FooterHeading({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <h4 className="footer-heading">
      <Icon aria-hidden="true" />
      <span>{children}</span>
    </h4>
  );
}
