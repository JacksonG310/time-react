import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import React, { CSSProperties, ReactNode, useRef } from "react";
import { SvgIcon } from "..";
import "./index.less";

interface IconSelectorProps {
    width: string;
    height: string;
    renderGroup: Array<ReactNode>;
}

const IconSelector: React.FC<IconSelectorProps> = (props) => {
    const { width, height } = props;
    const seletorStyle: CSSProperties = {
        width,
        height
    }
    const carouselRef = useRef<CarouselRef>(null);
    const handlePrev = () => carouselRef.current?.prev();
    const handleNext = () => carouselRef.current?.next();
    return (
        <div className="iconSelector" style={seletorStyle}>
            <Carousel dots={false} ref={carouselRef}>
                {
                    props.renderGroup && props.renderGroup.map(
                        (item) => (item)
                    )
                }
            </Carousel>
            <div className="switch-button-group">
                <span className="switch-button" onClick={handlePrev}>
                    <SvgIcon name="left" width="16px" height="16px" />
                </span>
                <span className="switch-button" onClick={handleNext}>
                    <SvgIcon name="right" width="16px" height="16px" />
                </span>
            </div>
        </div>
    )
}

export default IconSelector;