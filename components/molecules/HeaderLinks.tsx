import React from 'react';
import A from '../atoms/Link';
import { Column } from '../grid';

const HeaderLink = ({ children, href, ...rest }) => (
  <A className="ml-4" href={href} {...rest}>
    {children}
  </A>
);

export const HeaderLinks = () => (
  <React.Fragment>
    <Column>
      <div className="hidden sm:inline-block py-4">
        <HeaderLink href="/stay/add">Agregar anuncio</HeaderLink>
        {/* <HeaderLink href="/">Anfitrion</HeaderLink> */}
        <HeaderLink href="/">Mis Solicitudes</HeaderLink>
        <HeaderLink href="/session/login">Inicia sesion</HeaderLink>
      </div>
    </Column>
  </React.Fragment>
);
