

const Footer = () => {
  return (
    <footer
      style={{
        background:
          "linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 38%, rgba(0, 212, 255, 1) 100%)",
      }}
      className="py-6 px-10 text-white"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} The open help. All rights reserved.</p>
       
      </div>
    </footer>
  );
};

export default Footer;
