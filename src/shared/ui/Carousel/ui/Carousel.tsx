import cls from './Carousel.module.scss'
import Slider from "react-slick";
import { HFlex } from 'shared/ui/Stack/HFlex/HFlex';
import NavIcon from '../../../assets/icons/next-svgrepo-com.svg'
import Button, { ThemeButton } from 'shared/ui/Button/Button';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { AppImage } from 'shared/ui/AppImage/AppImage';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import AppLink from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { memo } from 'react';

interface CarouselData {
    imgUrl?: string,
    title?: string
    id?: string
}
interface CarouselProps {
    className?: string
    articles?: CarouselData[]
    isLoading?: boolean
}

interface ArrowProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export const Carousel = memo((props: CarouselProps) => {
    const { className, articles, isLoading } = props
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
        autoplay: true,
        autoplaySpeed: 4000,
        draggable: false,
        prevArrow: <CustomPrevArrow onClick={() => { }} />,
        nextArrow: <CustomNextArrow onClick={() => { }} />,
    };
    const renderSLide = (articles: CarouselData[]) => (
        articles.map(item => (
            <HFlex align='center' justify='center' className={cls.slide}>
                <AppLink to={RoutePath.article_details + `${item.id}`} className={cls.link}>
                    <AppImage src={item.imgUrl} className={cls.image} />

                </AppLink>
                <Text text={item.title} align={TextAlign.CENTER} className={cls.title} size={TextSize.L}></Text>


            </HFlex >
        ))
    )
    if (isLoading) {
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
                        <Skeleton width={'100%'} height={350} />
                    </Slider>
                </HFlex>
            </>

        )
    }


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
})
