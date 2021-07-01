import {useEffect, useRef, useState} from "react";
import './index.less'

interface ScrollYProperties {
    data: Array<any>;
    speed: number;
    title: Array<string>;
}

function ScrollY(props: ScrollYProperties) {
    const {data, speed, title} = props;
    const [isScroll, setIsScroll] = useState(true);
    const warper = useRef(null);
    const childDom1 = useRef(null);
    const childDom2 = useRef(null);
    useEffect(() => {
        //@ts-ignore
        childDom2.current.innerHTML = childDom1.current.innerHTML;
        let timer;
        if (isScroll) {
            timer = setInterval(
                () => {
                    warper.current.scrollTop >= childDom1.current.scrollHeight ? (warper.current.scrollTop = 0) : warper.current.scrollTop++;
                }, speed);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [isScroll]);

    const hoverHandler = (flag) => setIsScroll(flag);
    return <>
        <div className='sd-content'>
            <div className='sd-contentTitle'>
                {
                    title.map(item => <p>
                        {item}
                    </p>)
                }
            </div>
            <div className='sd-parent' ref={warper}>
                <div className='sd-child' ref={childDom1}>
                    <ul className='sd-scrollContent'>
                        {
                            data.map((item) => {
                                    let arr = [];
                                    for (let key in item) {
                                        arr.push(item[key]);
                                    }
                                    return <li onMouseOver={() => hoverHandler(false)}
                                               onMouseLeave={() => hoverHandler(true)}>
                                        {
                                            arr.map(item => <p>{item}</p>)
                                        }
                                    </li>
                                }
                            )
                        }
                    </ul>
                </div>
                <div className='sd-child' ref={childDom2}/>
            </div>
        </div>
    </>
}

export default ScrollY
