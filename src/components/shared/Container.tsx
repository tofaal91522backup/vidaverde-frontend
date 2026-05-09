import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div">;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full container px-5 md:px-8", className)}
      {...props}
    />
  );
}
