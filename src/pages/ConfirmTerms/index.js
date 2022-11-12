import React, { useState } from 'react'
import { ScreenScrollContainer, Row, Text } from '../../components/atoms'
import { Button, Input, RadioButton } from '../../components/molecules'
import { Validates } from '../../utils/validates'
import Toast from 'react-native-toast-message'

export function ConfirmTerms({ navigation }) {
  function handleNavigateRegister() {
    navigation.navigate('Register', {
      confirmouTermos: true,
    })
  }

  return (
    <ScreenScrollContainer
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Text mt="80" size="35" weight="bold">
        Termos de uso
      </Text>

      <Text mt="30" size="20" weight="bold" align="left">
        Política de Privacidade
      </Text>

      <Text mt="15" size="15" align="left" ml="20">
        Ao concordar com os termos de uso da aplicação easy delivery, você está
        automaticamente concordando com todas as condições abaixo. Por gentileza
        leia atentamente.
      </Text>

      <Text mt="20" size="20" weight="bold" align="left">
        Sobre o Easy Delivery
      </Text>

      <Text mt="15" size="15" align="left" ml="20">
        Easy delivery é um aplicativo mobile que tem o objetivo de ajudar os
        usuários a realizar uma entrega de algum objeto, desde a parte da
        contratação do motoboy até a parte da finalização da entrega.
      </Text>
      <Text mt="15" size="15" align="left" ml="20">
        Dentro do aplicativo os usuários vão conseguir visualizar todos os
        motoboys e as entregas cadastradas, e será de responsabilidade dos
        mesmos aceitar ou não fazer determinada entrega, e ao finalizar uma
        entrega os usuários terão a possibilidade de se avaliar entre si
        incluindo comentários nos perfis de cada um. Para usuários novos que
        estão em cidades novas, o easy delivery disponibilizou uma
        funcionalidade de geolocalização que irá mostrar a rota da entrega,
        facilitando para o usuário encontrar o endereço origem e o destino.
      </Text>
      <Text mt="15" size="15" align="left" ml="20">
        A aplicação não tem a funcionalidade de pagamentos, sendo assim é de
        responsabilidade dos usuários combinar a forma de pagamento e como o
        pagamento será realizado.
      </Text>

      <Text mt="20" size="20" weight="bold" align="left">
        Princípios de Privacidade
      </Text>

      <Text mt="15" size="18" align="left">
        Sobre as principais práticas de privacidade do easy delivery:
      </Text>

      <Text mt="15" size="15" align="left" ml="20">
        • Nosso aplicativo foi projetado para os usuários interagirem entre si,
        contratando e finalizando entregas.
      </Text>
      <Text mt="15" size="15" align="left" ml="20">
        • As informações pessoais coletadas dentro do aplicativo, serão
        utilizadas somente e exclusivamente dentro da aplicação.
      </Text>
      <Text mt="15" size="15" align="left" ml="20">
        • Não fazemos vendas de informações pessoais de nossos usuários.
      </Text>
      <Text mt="15" size="15" align="left" ml="20">
        • Suas informações serão armazenadas em nosso banco de dados e somente
        serão utilizadas caso alguma regra seja infringida.
      </Text>

      <Text mt="20" size="20" weight="bold" align="left">
        Informações pessoais que podemos coletar
      </Text>

      <Text mt="15" size="15" align="left" ml="20">
        Todas informações serão coletadas pela aplicação no momento dos
        cadastros, onde serão utilizadas somente dentro da aplicação, sem nenhum
        vínculo com outras aplicações externas.
      </Text>
      <Text mt="15" size="15" align="left" ml="20">
        As informações dos usuários serão utilizadas somente e exclusivas para
        exibição em nossas telas de listagens, para fins de informações aos
        demais usuários.
      </Text>

      <Text mt="20" size="20" weight="bold" align="left">
        Mudanças na Política de Privacidade
      </Text>

      <Text mt="15" size="15" align="left" ml="20">
        Todas e quaisquer mudanças feitas nas políticas de privacidade ou regra
        da aplicação, serão informadas via e-mail a todos os nossos usuários
        para que os mesmos fiquem cientes o mais rápido possível.
      </Text>

      <Text mt="20" size="20" weight="bold" align="left">
        Termos de serviço
      </Text>
      <Text mt="15" size="20" weight="bold" align="left">
        SUA CONTA
      </Text>

      <Text mt="15" size="15" align="left" ml="20">
        Ao utilizar nossa aplicação, o usuário é responsável por manter o sigilo
        de suas credenciais, como o e-mail e senha, para que somente o mesmo
        tenha acesso, sendo assim o usuário se responsabiliza por qualquer
        atividade que aconteça com sua conta.
      </Text>

      <Text mt="20" size="20" weight="bold" align="left">
        PAGAMENTOS
      </Text>

      <Text mt="15" size="15" align="left" ml="20">
        Os pagamentos deverão ser responsabilidade dos usuários, onde a
        aplicação somente se responsabiliza de fazer a logística e a ponte entre
        os usuários, sendo assim os usuários envolvidos na entrega deverão
        combinar o preço e a forma de pagamento do serviço realizado.
      </Text>

      <Text mt="20" size="20" weight="bold" align="left">
        FOTO DA CNH
      </Text>

      <Text mt="15" size="15" align="left" ml="20">
        O upload da foto da CNH poderá ser feito no cadastro do usuário, caso o
        usuário seja um motoboy. Mas o easy delivery não se responsabilizará em
        fazer nenhuma validação caso a foto não seja de uma CNH válida, mas no
        perfil do usuário terá a opção de visualizar a foto que foi feito o
        upload e assim fica ao critério do usuário contratante decidir contratar
        o motoboy ou não.
      </Text>

      <Text mt="20" size="18" align="left">
        CONTATO: easy.delivery@gmail.com
      </Text>

      <Button mt="20" wp="48" onPress={handleNavigateRegister}>
        Confirmar
      </Button>
    </ScreenScrollContainer>
  )
}
