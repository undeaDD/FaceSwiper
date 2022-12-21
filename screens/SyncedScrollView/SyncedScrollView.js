import { useContext, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export const SyncedScrollView = (props) => {
  const { id, ...rest } = props;
  const { activeScrollView, offsetPercent } = useContext(props.context);
  const [scrollViewLength, setScrollViewLength] = useState(0);
  const [contentLength, setContentLength] = useState(0);
  const [scrollableLength, setScrollableLength] = useState(0);

  useEffect(() => {
    setScrollableLength(contentLength - scrollViewLength);
  }, [scrollViewLength, contentLength])

  const handleLayout = ({ nativeEvent: { layout: { width, _height } } }) => {
    setScrollViewLength(width)
  }

  const handleContentSizeChange = (width, _height) => {
    setContentLength(width)
  }

  const scrollViewRef = useRef(null);

  offsetPercent?.addListener(({ value }) => {
    if (id !== activeScrollView._value && scrollableLength > 0) {
      scrollViewRef.current?.scrollToOffset({offset: value * scrollableLength, animated: false })
    }
  })

  const offset = new Animated.Value(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { ['x']: offset } } }],
    { useNativeDriver: true }
  )

  offset.addListener(({ value }) => {
    if (id === activeScrollView._value && scrollableLength > 0) {
      offsetPercent.setValue(value / scrollableLength)
    }
  })

  const handleTouchStart = () => {
    activeScrollView.setValue(id)
  }

  return (
    <Animated.FlatList
      {...rest}
      windowSize={3}
      horizontal={true}
      bounces={false}
      initialNumToRender={1}
      removeClippedSubviews={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      snapToAlignment={"start"}
      decelerationRate={"fast"}
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      onTouchStart={handleTouchStart}
      onLayout={handleLayout}
      onContentSizeChange={handleContentSizeChange}
    />
  );
}