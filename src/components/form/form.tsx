'use client';
import {
  ComponentProps,
  FC,
  PropsWithChildren,
  ReactNode,
  useMemo,
} from 'react';
import {
  FieldValues,
  FormProvider,
  Path,
  SubmitHandler,
  useFormContext,
  UseFormReturn,
} from 'react-hook-form';

import { LabelProps } from '@radix-ui/react-label';

import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea, TextareaProps } from '@/components/ui/textarea';
import { cn } from '@/lib/tailwind/utils';

export namespace FormProps {
  export interface Root<TFieldValues extends FieldValues>
    extends UseFormReturn<TFieldValues>,
      PropsWithChildren {
    className?: ComponentProps<'form'>['className'];
    onSubmit: SubmitHandler<TFieldValues>;
  }

  interface ComumFieldProps<TFieldValues extends FieldValues> {
    name: Path<TFieldValues>;
    label?: string;
    labelClassName?: LabelProps['className'];
    description?: string;
    descriptionClassName?: ComponentProps<'p'>['className'];
    containerClassName?: ComponentProps<'div'>['className'];
  }

  export type Input<TFieldValues extends FieldValues> =
    ComumFieldProps<TFieldValues> & InputProps;

  export type Textarea<TFieldValues extends FieldValues> =
    ComumFieldProps<TFieldValues> & TextareaProps;

  export type Label = LabelProps & { error: boolean };

  export type Description = ComponentProps<'p'>;

  export type Error = ComponentProps<'p'>;

  export type Wrapper<TFieldValues extends FieldValues> =
    ComumFieldProps<TFieldValues> & PropsWithChildren & { error?: string };
}

const Root = <TFieldValues extends FieldValues>({
  children,
  className,
  onSubmit,
  ...props
}: FormProps.Root<TFieldValues>): ReactNode => (
  <FormProvider {...props}>
    <form
      className={cn('flex flex-col justify-stretch gap-4', className)}
      onSubmit={props.handleSubmit(onSubmit)}
    >
      {children}
    </form>
  </FormProvider>
);

const FormLabel: FC<FormProps.Label> = ({
  className,
  children,
  error,
  ...props
}) =>
  children && (
    <Label
      className={cn(error && 'text-red-500 dark:text-red-900', className)}
      {...props}
    >
      {children}
    </Label>
  );

const FormDescription: FC<FormProps.Description> = ({
  children,
  className,
  ...props
}) =>
  children && (
    <p
      className={cn('text-sm text-zinc-500 dark:text-zinc-400', className)}
      {...props}
    >
      {children}
    </p>
  );

const FormError: FC<FormProps.Error> = ({ children, className }) => (
  <p
    className={cn(
      'text-sm font-medium text-red-500 dark:text-red-900',
      className
    )}
  >
    {children}
  </p>
);

const Wrapper = <TFieldValues extends FieldValues>({
  name,
  label,
  labelClassName,
  description,
  descriptionClassName,
  containerClassName,
  error,
  children,
}: FormProps.Wrapper<TFieldValues>): ReactNode => (
  <div className={cn('flex flex-col gap-2', containerClassName)}>
    {label && (
      <FormLabel error={!!error} className={labelClassName} htmlFor={name}>
        {label}
      </FormLabel>
    )}
    {children}
    {description && (
      <FormDescription className={descriptionClassName}>
        {description}
      </FormDescription>
    )}
    {error && <FormError>{error}</FormError>}
  </div>
);

const FormInput = <TFieldValues extends FieldValues>({
  name,
  label,
  labelClassName,
  description,
  descriptionClassName,
  containerClassName,
  ...props
}: FormProps.Input<TFieldValues>): ReactNode => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const error = useMemo(() => errors[name], [errors, name]);

  return (
    <Wrapper<TFieldValues>
      name={name}
      label={label}
      labelClassName={labelClassName}
      description={description}
      descriptionClassName={descriptionClassName}
      containerClassName={containerClassName}
      error={error ? String(error?.message) : undefined}
    >
      <Input aria-invalid={!!error} {...props} {...register(name)} />
    </Wrapper>
  );
};

const FormTextarea = <TFieldValues extends FieldValues>({
  name,
  label,
  labelClassName,
  description,
  descriptionClassName,
  containerClassName,
  ...props
}: FormProps.Textarea<TFieldValues>): ReactNode => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const error = useMemo(() => errors[name], [errors, name]);

  return (
    <Wrapper<TFieldValues>
      name={name}
      label={label}
      labelClassName={labelClassName}
      description={description}
      descriptionClassName={descriptionClassName}
      containerClassName={containerClassName}
      error={error ? String(error?.message) : undefined}
    >
      <Textarea aria-invalid={!!error} {...props} {...register(name)} />
    </Wrapper>
  );
};

export const Form = { Root, Input: FormInput, Textarea: FormTextarea };
