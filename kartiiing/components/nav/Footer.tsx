const Footer = () => {
  return (
    <footer className="border-t">
      <div className="border-x p-4 lg:px-8 max-w-[90rem] mx-auto text-center w-full text-sm">
        © {new Date().getFullYear()} Boldizsar Szabo
      </div>
    </footer>
  );
};

export default Footer;
