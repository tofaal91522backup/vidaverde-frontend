import { Container } from "@/components/shared/Container";
import { CatalogGrid } from "./components/CatalogGrid";

export default function CoursesRoute() {
  return (
    <>
      <section className="page-head" data-screen-label="01 Courses Head">
        <Container>
          <div className="crumb">Home <span>/</span> Courses</div>
          <h1 className="h1">
            Classes in Quito.
            <br />
            Spanish across Ecuador.
          </h1>
          <p className="lede">
            Whether you want regular classes, DELE preparation, online lessons,
            or a travelling classroom, Vida Verde has developed programs over
            more than 20 years of teaching Spanish in Quito.
          </p>
        </Container>
      </section>
      <section id="rates" className="catalog pt-0" data-screen-label="02 Catalog">
        <Container>
          <CatalogGrid />
        </Container>
      </section>
    </>
  );
}
