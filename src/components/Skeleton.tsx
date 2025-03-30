import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
}) => {
  const shimmerAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmerAnim]);

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-200, 200], // Adjust width for better shimmer effect
  });

  return (
    <View style={[styles.container, {width, height, borderRadius}, style]}>
      <LinearGradient
        colors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={styles.gradient}>
        <Animated.View
          style={[
            styles.shimmer,
            {transform: [{translateX: shimmerTranslate}]},
          ]}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
    marginTop: 10,
  },
  gradient: {
    flex: 1,
  },
  shimmer: {
    width: '30%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});

export default Skeleton;
