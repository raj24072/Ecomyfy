import {
  HeroSection,
  ProductCard,
  Testimonial,
  Track,
} from "../../components/component";

function Home() {
  const categories = ["Sport", "Formal", "Casual", "Loafers", "Chelsea"];
  return (
    <div>
      <HeroSection />
      <div>
        <ProductCard category={categories[0]} heading="Sport" />
        <ProductCard category={categories[1]} heading="Formal" />
        <ProductCard category={categories[2]} heading="Casual" />
        <ProductCard category={categories[3]} heading="Loafers" />
        <ProductCard category={categories[4]} heading="Chelsea" />
      </div>
      <Track />
      <Testimonial />
    </div>
  );
}

export default Home;
