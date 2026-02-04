import Image from 'next/image';
import { Title } from './title';
import { Button } from '../ui';

const Slide = () => {
  return (
    <div className="h-[450px] bg-sidebar-ring mt-3 flex justify-between">
      <div className="w-[568px]  pl-10 pt-17 pb-21">
        <Title
          text="Welcome to GreenShop"
          size="xs"
          className="text-sm font-medium mb-2 uppercase"
        />
        <div className="">
          <Title
            text="Let’s Make a"
            size="sm"
            className="text-[67px] font-black leading-17 uppercase"
          />
          <div className="text-[67px] font-black leading-17 uppercase">
            <span>Better </span>
            <span className="text-primary">Planet</span>
          </div>
        </div>
        <p className=" w-[528px] text-muted-foreground text-sm mt-1.5 mb-11">
          We are an online plant shop offering a wide range of cheap and trendy plants. Use our
          plants to create an unique Urban Jungle. Order your favorite plants!
        </p>
        <Button className="px-6 py-2.5">SHOP NOW</Button>
      </div>
      <Image
        src="/carousel-img.png"
        alt="carousel-img"
        width={518}
        height={450}
        className="object-cover"
      />
    </div>
  );
};

export default Slide;
