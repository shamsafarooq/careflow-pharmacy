import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Pill, ShieldCheck, Clock, Truck, Heart, Thermometer, Eye, Droplet, Activity, Apple, Wind, Cross } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const iconMap: Record<string, any> = {
  pill: Pill, shield: ShieldCheck, apple: Apple, wind: Wind, heart: Heart,
  thermometer: Thermometer, droplet: Droplet, eye: Eye, cross: Cross, activity: Activity,
};

export default function Index() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) throw error;
      return data;
    },
  });

  const { data: featured } = useQuery({
    queryKey: ["featured-medicines"],
    queryFn: async () => {
      const { data, error } = await supabase.from("medicines").select("*, categories(name)").limit(6);
      if (error) throw error;
      return data;
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/medicines?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20 md:py-28">
        <div className="container text-center max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4 text-primary">Trusted Online Pharmacy</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Your Health, Our <span className="text-primary">Priority</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Browse thousands of medicines, check dosage info, and get your prescriptions filled — all in one place.
          </p>
          <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search medicines or diseases..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-12" />
            </div>
            <Button type="submit" size="lg">Search</Button>
          </form>
        </div>
      </section>

      {/* Features */}
      <section className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: ShieldCheck, label: "Verified Medicines", desc: "100% authentic" },
          { icon: Clock, label: "24/7 Support", desc: "Always available" },
          { icon: Truck, label: "Fast Delivery", desc: "Same day shipping" },
          { icon: Pill, label: "Expert Guidance", desc: "Licensed pharmacists" },
        ].map(({ icon: Icon, label, desc }) => (
          <Card key={label} className="text-center p-4">
            <CardContent className="pt-2 space-y-1">
              <Icon className="h-8 w-8 mx-auto text-primary" />
              <p className="font-semibold text-sm">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Categories */}
      <section className="container py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Button variant="ghost" asChild><Link to="/categories">View All</Link></Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories?.map((cat) => {
            const Icon = iconMap[cat.icon || "pill"] || Pill;
            return (
              <Link key={cat.id} to={`/medicines?category=${cat.id}`}>
                <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer text-center p-4">
                  <CardContent className="pt-2 space-y-2">
                    <Icon className="h-8 w-8 mx-auto text-primary" />
                    <p className="text-sm font-medium">{cat.name}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Medicines */}
      <section className="container py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Medicines</h2>
          <Button variant="ghost" asChild><Link to="/medicines">View All</Link></Button>
        </div>
        {featured && featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((med) => (
              <Card key={med.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 bg-muted flex items-center justify-center">
                  {med.image_url ? (
                    <img src={med.image_url} alt={med.name} className="h-full w-full object-cover" />
                  ) : (
                    <Pill className="h-12 w-12 text-muted-foreground/40" />
                  )}
                </div>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold line-clamp-1">{med.name}</h3>
                    {med.prescription_required && <Badge variant="destructive" className="text-[10px] shrink-0">Rx</Badge>}
                  </div>
                  {med.brand && <p className="text-xs text-muted-foreground">{med.brand}</p>}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">${Number(med.price).toFixed(2)}</span>
                    <Badge variant={med.quantity > 0 ? "secondary" : "destructive"}>
                      {med.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  <Button asChild className="w-full" size="sm">
                    <Link to={`/medicines/${med.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Pill className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground">No medicines available yet. Check back soon!</p>
          </Card>
        )}
      </section>
    </div>
  );
}
