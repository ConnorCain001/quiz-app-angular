import { Directive, HostBinding, Input } from '@angular/core';

const baseStyles =
  'inline-flex justify-center text-center border-2 items-center rounded-md font-medium disabled:opacity-50 disabled:pointer-events-none';

export type Variant = 'primary' | 'secondary';
const variants: { [K in Variant]: string } = {
  primary:
    'border-indigo-500 bg-indigo-500 text-white hover:bg-indigo-600 hover:border-indigo-600',
  secondary: 'border-indigo-500 text-indigo-400 hover:bg-white/5',
};

export type Size = 'default' | 'sm' | 'lg';
const sizeVariants: { [K in Size]: string } = {
  default: 'px-4 py-2 text-base',
  sm: 'px-3 py-1.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

const buildTwClasses = (variant: Variant, size: Size): string =>
  `${baseStyles} ${sizeVariants[size]} ${variants[variant]}`;

@Directive({
  selector: '[buttonStyle]',
  standalone: true,
})
export class ButtonStyleDirective {
  @Input() variant: Variant = 'primary';
  @Input() size: Size = 'default';

  @HostBinding('class') get classes(): string {
    return buildTwClasses(this.variant, this.size);
  }
}
