export default function Footer() {
  return (
    <footer className="flex z-99 items-center justify-center px-14 py-4 border-t bg-muted  w-full">
      <div className="text-center">
        <p className="text-xs sm:text-sm text-muted-foreground">
          ©2026 Catering Dhewi. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          BTN Asabri, Jl. Sriti Blok N2, Gedog, Kec. Sananwetan, Kota Blitar,
          Jawa Timur
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Whatsapp :{" "}
          <a
            href="https://wa.me/6282234187211"
            target="_blank"
            className="font-bold"
          >
            082234187211
          </a>
        </p>
      </div>
    </footer>
  );
}
