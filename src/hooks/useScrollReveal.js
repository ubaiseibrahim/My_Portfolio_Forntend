import { useEffect, useState, useRef } from 'react';

const useScrollReveal = (options = { threshold: 0.1 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    // Destructure options to avoid dependency array issues with object literals
    const { threshold, root, rootMargin } = options;

    useEffect(() => {
        const currentElement = elementRef.current;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target); // Reveal only once
            }
        }, { threshold, root, rootMargin });

        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [threshold, root, rootMargin]); // Use primitives to ensure stable updates

    return [elementRef, isVisible];
};

export default useScrollReveal;
