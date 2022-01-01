import { type Identifier, type ImportDeclaration } from 'estree';

export const isIdentifierNode = (target: any): target is Identifier =>
  target.type === 'Identifier' && 'name' in (target as Identifier);

export const isImportDeclarationNode = (target: any): target is ImportDeclaration =>
  target.type === 'ImportDeclaration' && 'source' in (target as ImportDeclaration);