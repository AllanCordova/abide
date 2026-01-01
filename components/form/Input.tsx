import { forwardRef, InputHTMLAttributes, useId } from "react";
import { AlertCircle } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    // 1. Gera um ID aleatório único (ex: :r1:)
    const generatedId = useId();

    // 2. Se o usuário passou um 'id' via props, usa ele. Se não, usa o gerado.
    const inputId = id || generatedId;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* 3. Conecta o label ao input via htmlFor */}
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-muted ml-1 cursor-pointer"
        >
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            id={inputId} // 4. Aplica o ID no input
            className={`
              w-full
              bg-background
              text-foreground
              border
              rounded-lg
              px-4 py-2.5
              text-sm
              outline-none
              transition-all duration-200
              placeholder:text-muted/40 

              ${
                error
                  ? "border-error focus:border-error focus:ring-2 focus:ring-error/20"
                  : "border-border hover:border-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
              }
              
              ${className} 
            `}
            {...props}
          />
        </div>

        {error && (
          <span className="flex items-center gap-1.5 text-error text-xs font-medium animate-in slide-in-from-top-1 fade-in duration-200 ml-1">
            <AlertCircle size={12} />
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
