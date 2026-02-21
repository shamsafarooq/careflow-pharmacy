import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Pill, ArrowLeft, AlertTriangle, Info, FileText, Beaker, Building2, Calendar } from "lucide-react";

export default function MedicineDetailPage() {
  const { id } = useParams();

  const { data: medicine, isLoading } = useQuery({
    queryKey: ["medicine", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("medicines").select("*, categories(name)").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container py-8 max-w-4xl animate-pulse space-y-6">
        <div className="h-8 bg-muted rounded w-48" />
        <div className="h-64 bg-muted rounded" />
        <div className="h-32 bg-muted rounded" />
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="container py-16 text-center">
        <Pill className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Medicine Not Found</h2>
        <Button asChild><Link to="/medicines">Back to Medicines</Link></Button>
      </div>
    );
  }

  const sections = [
    { title: "Usage & Purpose", icon: Info, content: medicine.usage },
    { title: "Dosage Instructions", icon: FileText, content: medicine.dosage },
    { title: "Side Effects", icon: AlertTriangle, content: medicine.side_effects },
    { title: "Warnings", icon: AlertTriangle, content: medicine.warnings },
    { title: "Precautions", icon: Info, content: medicine.precautions },
    { title: "Ingredients", icon: Beaker, content: medicine.ingredients },
  ];

  return (
    <div className="container py-8 max-w-4xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/medicines"><ArrowLeft className="mr-2 h-4 w-4" />Back to Medicines</Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
          {medicine.image_url ? (
            <img src={medicine.image_url} alt={medicine.name} className="h-full w-full object-cover" />
          ) : (
            <Pill className="h-24 w-24 text-muted-foreground/30" />
          )}
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {(medicine.categories as any)?.name && <Badge variant="outline">{(medicine.categories as any).name}</Badge>}
              {medicine.prescription_required && <Badge variant="destructive">Prescription Required</Badge>}
            </div>
            <h1 className="text-3xl font-bold">{medicine.name}</h1>
            {medicine.generic_name && <p className="text-muted-foreground">Generic: {medicine.generic_name}</p>}
            {medicine.brand && <p className="text-sm text-muted-foreground">Brand: {medicine.brand}</p>}
          </div>

          <Separator />

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">${Number(medicine.price).toFixed(2)}</span>
            <Badge variant={medicine.quantity > 0 ? "secondary" : "destructive"} className="text-sm">
              {medicine.quantity > 0 ? `${medicine.quantity} in stock` : "Out of Stock"}
            </Badge>
          </div>

          {medicine.description && <p className="text-muted-foreground">{medicine.description}</p>}

          <div className="grid grid-cols-2 gap-3 text-sm">
            {medicine.manufacturer && (
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{medicine.manufacturer}</span>
              </div>
            )}
            {medicine.expiry_date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Exp: {new Date(medicine.expiry_date).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Sections */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {sections.filter(s => s.content).map(({ title, icon: Icon, content }) => (
          <Card key={title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
