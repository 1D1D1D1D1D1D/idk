import cls from './Carousel.module.scss'
import Slider from "react-slick";
import { HFlex } from 'shared/ui/Stack/HFlex/HFlex';
import NavIcon from '../../../assets/icons/next-svgrepo-com.svg'
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { AppImage } from 'shared/ui/AppImage/AppImage';

interface CarouselData {
    imgUrl?: string,
    title?: string
}
interface CarouselProps {
    className?: string
    articles?: CarouselData[]
}

interface ArrowProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export const Carousel = (props: CarouselProps) => {
    const { className, articles } = props
    const CustomPrevArrow = (props: ArrowProps) => {
        const { onClick } = props;
        return (
            <Button theme={ThemeButton.CLEAR} className={cls.btnPrev} onClick={onClick}><NavIcon className={cls.prevIcon} /></Button>
        );
    };

    const CustomNextArrow = (props: ArrowProps) => {
        const { onClick } = props;
        return (
            <Button theme={ThemeButton.CLEAR} onClick={onClick} className={cls.btnNext}><NavIcon className={cls.nextIcon} /></Button>
        );
    };
    const settings = {
        prevArrow: <CustomPrevArrow onClick={() => { }} />,
        nextArrow: <CustomNextArrow onClick={() => { }} />,
    };
    const renderSLide = (articles: CarouselData[]) => (
        articles.map(item => (
            <HFlex align='center' justify='center' className={cls.slide}>
                <AppImage src={item.imgUrl} className={cls.image} />
                <Text text={item.title} align={TextAlign.CENTER} className={cls.title} size={TextSize.M}></Text>
            </HFlex>
        ))
    )



    return (
        <>
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            <HFlex justify='center' align='center' className={cls.carousel}>
                <Slider className={cls.Slider} {...settings}>
                    {articles && renderSLide(articles)}
                </Slider>
            </HFlex>
        </>
    );
}
