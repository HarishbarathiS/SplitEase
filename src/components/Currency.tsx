import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Currency = ({
  onCurrencyChange,
}: {
  onCurrencyChange: (symbol: string) => void;
}) => {
  const currency_json = [
    { currency: "United States Dollar", code: "USD", symbol: "$" },
    { currency: "Euro", code: "EUR", symbol: "€" },
    { currency: "British Pound Sterling", code: "GBP", symbol: "£" },
    { currency: "Japanese Yen", code: "JPY", symbol: "¥" },
    { currency: "Swiss Franc", code: "CHF", symbol: "CHF" },
    { currency: "Canadian Dollar", code: "CAD", symbol: "C$" },
    { currency: "Australian Dollar", code: "AUD", symbol: "A$" },
    { currency: "Chinese Yuan Renminbi", code: "CNY", symbol: "¥" },
    { currency: "Indian Rupee", code: "INR", symbol: "₹" },
    { currency: "South Korean Won", code: "KRW", symbol: "₩" },
    { currency: "Russian Ruble", code: "RUB", symbol: "₽" },
    { currency: "Brazilian Real", code: "BRL", symbol: "R$" },
    { currency: "South African Rand", code: "ZAR", symbol: "R" },
    { currency: "Singapore Dollar", code: "SGD", symbol: "S$" },
    { currency: "New Zealand Dollar", code: "NZD", symbol: "NZ$" },
    { currency: "Mexican Peso", code: "MXN", symbol: "Mex$" },
    { currency: "Turkish Lira", code: "TRY", symbol: "₺" },
    { currency: "Saudi Riyal", code: "SAR", symbol: "﷼" },
    { currency: "UAE Dirham", code: "AED", symbol: "د.إ" },
    { currency: "Thai Baht", code: "THB", symbol: "฿" },
  ];

  const handleCurrencyChange = (value: string) => {
    const selected = currency_json.find((item) => item.code === value);
    if (selected) {
      onCurrencyChange(selected.symbol);
    }
  };

  return (
    <Select onValueChange={handleCurrencyChange}>
      <SelectTrigger className="bg-primary text-white p-3 rounded-lg w-[180px] border-none">
        <SelectValue placeholder="Select a Currency" />
      </SelectTrigger>
      <SelectContent className="bg-primary text-white">
        <SelectGroup>
          <SelectLabel className="text-white">Currencies</SelectLabel>
          {currency_json
            .sort((a, b) => a.currency.localeCompare(b.currency))
            .map((item) => (
              <SelectItem
                key={item.code}
                value={item.code}
                className="bg-primary text-white"
              >
                {item.currency} ({item.symbol})
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Currency;
