import { Pill } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary mb-3">
            <Pill className="h-5 w-5" />
            MediCare
          </Link>
          <p className="text-sm text-muted-foreground">
            Your trusted online pharmacy for quality medicines and healthcare products.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/medicines" className="hover:text-primary transition-colors">All Medicines</Link>
            <Link to="/categories" className="hover:text-primary transition-colors">Categories</Link>
            <Link to="/calculator" className="hover:text-primary transition-colors">Dosage Calculator</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p>support@medicare-pharmacy.com</p>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MediCare Pharmacy. All rights reserved.
      </div>
    </footer>
  );
}
