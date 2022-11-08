import { Text } from '@nextui-org/react';
import ColoredText from '../ColoredText';

export default function Description() {
    return (
        <Text h4>
            Hello, my name is <ColoredText color="blue-600" text="Emirhan" />, I live in{' '}
            <ColoredText color="blue-600" text="Istanbul/Turkey" />, I have been involved in
            software for 2 years, I am a full stack developer.
        </Text>
    );
}
