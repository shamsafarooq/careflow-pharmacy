import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const { user, signOut, userRole } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/medicines?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Pill className="h-6 w-6" />
          <span className="hidden sm:inline">MediCare</span>
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medicines, diseases..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </form>

        <nav className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild><Link to="/medicines">Medicines</Link></Button>
          <Button variant="ghost" asChild><Link to="/categories">Categories</Link></Button>
          <Button variant="ghost" asChild><Link to="/calculator">Calculator</Link></Button>
          {user ? (
            <>
              {(userRole === "admin" || userRole === "pharmacist") && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin">Dashboard</Link>
                </Button>
              )}
              <Button variant="ghost" size="icon" asChild><Link to="/profile"><User className="h-4 w-4" /></Link></Button>
              <Button variant="ghost" size="sm" onClick={signOut}>Logout</Button>
            </>
          ) : (
            <Button asChild><Link to="/auth">Sign In</Link></Button>
          )}
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t p-4 space-y-3 bg-background">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search medicines..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
          </form>
          <div className="flex flex-col gap-1">
            <Button variant="ghost" asChild className="justify-start" onClick={() => setMobileOpen(false)}><Link to="/medicines">Medicines</Link></Button>
            <Button variant="ghost" asChild className="justify-start" onClick={() => setMobileOpen(false)}><Link to="/categories">Categories</Link></Button>
            <Button variant="ghost" asChild className="justify-start" onClick={() => setMobileOpen(false)}><Link to="/calculator">Calculator</Link></Button>
            {user ? (
              <>
                {(userRole === "admin" || userRole === "pharmacist") && (
                  <Button variant="ghost" asChild className="justify-start" onClick={() => setMobileOpen(false)}>
                    <Link to="/admin">Dashboard</Link>
                  </Button>
                )}
                <Button variant="ghost" asChild className="justify-start" onClick={() => setMobileOpen(false)}><Link to="/profile">Profile</Link></Button>
                <Button variant="ghost" className="justify-start" onClick={() => { signOut(); setMobileOpen(false); }}>Logout</Button>
              </>
            ) : (
              <Button asChild onClick={() => setMobileOpen(false)}><Link to="/auth">Sign In</Link></Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
