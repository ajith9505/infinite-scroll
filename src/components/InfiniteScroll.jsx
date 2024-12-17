import React, { useState, useEffect, useRef } from 'react';

// genrating array of input data
const generateDummyData = (count) => {
    return Array.from({ length: count }, () => `This Is Infinite Scrolling Page`);
};

const InfiniteScroll = () => {
    //initilize states
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const loader = useRef(null);

    //initial data loaded when the component is mounted
    useEffect(() => {
        const loadItems = () => {
            setIsLoading(true);
            setTimeout(() => {
                setItems(generateDummyData(20));
                setIsLoading(false);
            }, 1000);
        };

        loadItems();
    }, []);

    useEffect(() => {
    
        const observer = new IntersectionObserver(
            //checking visiblity of loader
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreItems();
                }
            },
            { threshold: 1 }
        );

        //observing loader element
        if (loader.current) {
            observer.observe(loader.current);
        }

        //cleanup function
        return () => {
            //removing observation when loader is unmounted
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [loader]);

    //function for create more items of input array
    const loadMoreItems = () => {
        if (isLoading) return;
        setIsLoading(true);
        setTimeout(() => {
            setItems((prevItems) => {
                const newItems = generateDummyData(10);
                return [...prevItems, ...newItems]
            });
            setIsLoading(false);
        }, 1000);

    };
    return (
        <div style={{ paddingBottom: '20px', textAlign:'center' }}>
            <h1>Infinite Scroll Example</h1>

            {items.map((item, index) => (

                <h2 key={index}>{item}</h2>

            ))}

            {isLoading && <p>Loading...</p>}
            <div ref={loader}></div>
        </div>
    )
}

export default InfiniteScroll