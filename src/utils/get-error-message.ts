export function getErrorMessage(err: unknown) {
  if (!err) return "Something went wrong.";

  if (err instanceof Error) return err.message;

  const anyErr = err as any;
  return (
    anyErr?.response?.data?.message ||
    anyErr?.data?.message ||
    anyErr?.message ||
    "Something went wrong."
  );
}
