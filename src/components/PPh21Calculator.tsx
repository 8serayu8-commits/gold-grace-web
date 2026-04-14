import { useState } from "react";
import { Calculator, DollarSign, Users, TrendingUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";

interface TaxResult {
  grossIncome: number;
  taxableIncome: number;
  annualTax: number;
  monthlyTax: number;
  netIncome: number;
  effectiveRate: number;
}

const PPh21Calculator = () => {
  const { t, language } = useLanguage();
  const [grossIncome, setGrossIncome] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [dependents, setDependents] = useState("");
  const [ptkp, setPtkp] = useState("");
  const [result, setResult] = useState<TaxResult | null>(null);

  const ptkpOptions = [
    { value: "54000000", label: "TK/0 (Rp54.000.000)" },
    { value: "58500000", label: "TK/1 (Rp58.500.000)" },
    { value: "63000000", label: "TK/2 (Rp63.000.000)" },
    { value: "67500000", label: "TK/3 (Rp67.500.000)" },
    { value: "117000000", label: "K/0 (Rp117.000.000)" },
    { value: "121500000", label: "K/1 (Rp121.500.000)" },
    { value: "126000000", label: "K/2 (Rp126.000.000)" },
    { value: "130500000", label: "K/3 (Rp130.500.000)" },
    { value: "126000000", label: "KI/0 (Rp126.000.000)" },
    { value: "130500000", label: "KI/1 (Rp130.500.000)" },
    { value: "135000000", label: "KI/2 (Rp135.000.000)" },
    { value: "139500000", label: "KI/3 (Rp139.500.000)" },
  ];

  const calculateTax = () => {
    const income = parseFloat(grossIncome) || 0;
    const ptkpAmount = parseFloat(ptkp) || 54000000;
    
    if (income <= 0) {
      alert(t('invalidIncome'));
      return;
    }

    // Calculate annual income (assuming monthly input)
    const annualIncome = income * 12;
    
    // Calculate taxable income
    const taxableIncome = Math.max(0, annualIncome - ptkpAmount);
    
    // Calculate annual tax using progressive rates
    let annualTax = 0;
    
    if (taxableIncome > 0) {
      if (taxableIncome <= 60000000) {
        annualTax = taxableIncome * 0.05;
      } else if (taxableIncome <= 250000000) {
        annualTax = 60000000 * 0.05 + (taxableIncome - 60000000) * 0.15;
      } else if (taxableIncome <= 500000000) {
        annualTax = 60000000 * 0.05 + 190000000 * 0.15 + (taxableIncome - 250000000) * 0.25;
      } else if (taxableIncome <= 5000000000) {
        annualTax = 60000000 * 0.05 + 190000000 * 0.15 + 250000000 * 0.25 + (taxableIncome - 500000000) * 0.30;
      } else {
        annualTax = 60000000 * 0.05 + 190000000 * 0.15 + 250000000 * 0.25 + 4500000000 * 0.30 + (taxableIncome - 5000000000) * 0.35;
      }
    }
    
    const monthlyTax = annualTax / 12;
    const netIncome = income - monthlyTax;
    const effectiveRate = annualIncome > 0 ? (annualTax / annualIncome) * 100 : 0;

    setResult({
      grossIncome: income,
      taxableIncome,
      annualTax,
      monthlyTax,
      netIncome,
      effectiveRate,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const resetCalculator = () => {
    setGrossIncome("");
    setMaritalStatus("");
    setDependents("");
    setPtkp("");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-primary" />
            {t('taxCalculatorTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t('taxCalculatorAlert')}
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="gross-income">{t('grossIncomeLabel')}</Label>
                <Input
                  id="gross-income"
                  type="number"
                  placeholder={t('incomePlaceholder')}
                  value={grossIncome}
                  onChange={(e) => setGrossIncome(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="ptkp">{t('ptkpStatusLabel')}</Label>
                <Select value={ptkp} onValueChange={setPtkp}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={t('ptkpPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {ptkpOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-sm">{t('ptkpExplanation')}:</h4>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p><strong>TK</strong> = {t('tkExplanation')}</p>
                  <p><strong>K</strong> = {t('kExplanation')}</p>
                  <p><strong>KI</strong> = {t('kiExplanation')}</p>
                  <p><strong>/0, /1, /2, /3</strong> = {t('dependentsExplanation')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={calculateTax} className="flex-1">
              <Calculator className="h-4 w-4 mr-2" />
              {t('calculateTaxButton')}
            </Button>
            <Button variant="outline" onClick={resetCalculator}>
              {t('resetButton')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              {t('calculationResults')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm font-medium">{t('grossIncomeMonthly')}</span>
                  <span className="font-semibold">{formatCurrency(result.grossIncome)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm font-medium">{t('taxableIncomeAnnual')}</span>
                  <span className="font-semibold">{formatCurrency(result.taxableIncome)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm font-medium">{t('pph21Annual')}</span>
                  <span className="font-semibold text-red-600">{formatCurrency(result.annualTax)}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm font-medium">{t('pph21Monthly')}</span>
                  <span className="font-semibold text-red-600">{formatCurrency(result.monthlyTax)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm font-medium">{t('netIncomeMonthly')}</span>
                  <span className="font-semibold text-green-600">{formatCurrency(result.netIncome)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm font-medium">{t('effectiveRate')}</span>
                  <span className="font-semibold">{result.effectiveRate.toFixed(2)}%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-2 text-sm">{t('summary')}:</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{t('summaryText1', { grossIncome: formatCurrency(result.grossIncome), monthlyTax: formatCurrency(result.monthlyTax), annualTax: formatCurrency(result.annualTax) })}</p>
                <p>{t('summaryText2', { netIncome: formatCurrency(result.netIncome), effectiveRate: result.effectiveRate.toFixed(2) })}</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-sm">{t('taxStructure')}:</h4>
              <div className="text-xs text-muted-foreground space-y-1 bg-secondary/30 p-3 rounded-lg">
                <p>{t('taxBracket1')}</p>
                <p>{t('taxBracket2')}</p>
                <p>{t('taxBracket3')}</p>
                <p>{t('taxBracket4')}</p>
                <p>{t('taxBracket5')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PPh21Calculator;
