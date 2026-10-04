import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer>
      <div className="wrap f-in">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.locationShort} · {profile.role}</span>
        <span><a href="/articles/">Articles</a> · <a href="#top">Back to top ↑</a></span>
      </div>
    </footer>
  );
}
