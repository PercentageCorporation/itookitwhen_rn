import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const TextInput = styled.TextInput`
  width: 100%;
  height: 60px;
  font-size: 18px;
  flex: 1;
  color: #010101;
  margin-left: 10px;
`;

export const InputContainer = () => {
  return (
    <Container>
      <TextInput placeholder="What's on your mind?" />
    </Container>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  margin-vertical: 40px;
  width: 120px;
  height: 40px;
  padding: 12px;
  border-radius: 10px;
  background-color: ${props => props.bgColor};
`;

const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${props => (props.primary ? 'white' : '#010101')};
`;

export const PressableButton = ({ onPress, primary, bgColor, title }) => (
  <ButtonContainer onPress={onPress} bgColor={bgColor}>
    <ButtonText primary={primary}>{title}</ButtonText>
  </ButtonContainer>
);

export const Form = styled.View`
    padding: 10px;
`;
export const FormInput = styled.TextInput`
    border: 1px solid gray;
    font-size: 18px;
    padding: 8px;
    margin-bottom: 25px;
`;
export const FormTextBox = styled.Text`
    border: 1px solid gray;
    font-size: 18px;
    padding: 8px;
    margin-bottom: 25px;
    color: #ffffff;
`;

export const FormLabel = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: #ffffff;
`;
export const FormButton = styled.TouchableOpacity`
    background: #0077cc;
    width: 100%;
    padding: 8px;
`;
export const BtnText = styled.Text`
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
`;

export const Header = props => (
	<HeaderContainer
		backgroundColor={props.backgroundColor}
	>
		<HeaderText textColor={props.textColor}>{props.text}</HeaderText>
	</HeaderContainer>
);

const HeaderContainer = styled.View`
  margin-top: 20px;
`;

const HeaderText = styled.Text`
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

export const Logo = props => (
  <LogoView>
    <LogoImage source={props.source} size={props.size} />
  </LogoView>
);

const LogoView = styled.View`
  text-align: center;
  margin-top: 30px;
  width: 100%;
`;

const LogoImage = styled.Image`
  margin: auto;
  height: ${props => props.size};
  width: ${props => props.size};
`;
