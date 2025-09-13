export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-muted-foreground text-sm">
          <p className="mb-2">
            The information provided by this calculator is for educational and estimation purposes only. It is not a substitute for legal advice. Consult with a qualified attorney for advice on your specific situation.
          </p>
          <p>&copy; {currentYear} State Support. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
