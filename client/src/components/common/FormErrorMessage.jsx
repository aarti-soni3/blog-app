// common error msg to display when validation fails
export default function FormErrorMessage({ error }) {
  if (!error) return null;
  return <div className="invalid-feedback">{error.message}</div>;
}
