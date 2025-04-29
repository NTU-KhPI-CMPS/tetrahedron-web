import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:text-[#747474] disabled:bg-grey-disabled',
  {
    variants: {
      variant: {
        default:
          'border border-transparent bg-app-blue text-soft hover:bg-transparent hover:border-app-blue hover:text-app-blue active:text-soft active:bg-button-pressed',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-button-default text-soft disabled:bg-button-disable hover:bg-button-hover',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'border border-coal-black bg-peach',
        link: 'text-primary underline-offset-4 hover:underline',
        black: 'bg-coal-black text-soft rounded-full'
      },
      size: {
        default: 'h-10 px-4 py-2',
        wide: 'h-10 px-6 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10 hover:bg-button-pressed hover:text-soft',
        custom: 'w-full h-6 py-2 px-8 rounded-sm '
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
