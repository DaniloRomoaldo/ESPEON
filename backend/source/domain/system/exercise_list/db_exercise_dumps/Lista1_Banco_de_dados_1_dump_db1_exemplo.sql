CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE situacao_enum AS ENUM ('Em Andamento','Concluído','Em Atraso','Aberto','Resolvido','Ativo','Devolvido','Encerrado');
CREATE TYPE tipo_enum AS ENUM ('software','servidor','computador');
CREATE TYPE severidade_enum AS ENUM ('Baixa','Média','Alta');
CREATE TABLE funcao (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao varchar(255),
  created_at timestamp,
  updated_at timestamp
);
CREATE TABLE nivel (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao varchar(255)
);
CREATE TABLE cargo (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao varchar(255)
);
CREATE TABLE funcionario (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nome varchar(100),
  id_funcao uuid,
  id_nivel uuid,
  id_cargo uuid,
  created_at timestamp,
  CONSTRAINT fk_funcao FOREIGN KEY (id_funcao) REFERENCES funcao (id),
  CONSTRAINT fk_nivel FOREIGN KEY (id_nivel) REFERENCES nivel (id),
  CONSTRAINT fk_cargo FOREIGN KEY (id_cargo) REFERENCES cargo (id)
);
CREATE TABLE tipo_chamado (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao varchar(255)
);
CREATE TABLE situacao (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  valor situacao_enum,
  created_at timestamp
);
CREATE TABLE chamado (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  atendente varchar(100),
  requerente varchar(100),
  tipo_chamado_id uuid,
  situacao_id uuid,
  created_at timestamp,
  CONSTRAINT fk_tipo_chamado FOREIGN KEY (tipo_chamado_id) REFERENCES tipo_chamado (id),
  CONSTRAINT fk_situacao FOREIGN KEY (situacao_id) REFERENCES situacao (id)
);
INSERT INTO funcao (id, descricao, created_at, updated_at) VALUES
('a1b2c3d4-0001-0001-0001-000000000001', 'Desenvolvedor de Software', NOW(), NOW()),
('a1b2c3d4-0001-0001-0001-000000000002', 'Analista de Suporte Técnico', NOW(), NOW()),
('a1b2c3d4-0001-0001-0001-000000000003', 'Gerente de TI', NOW(), NOW());
INSERT INTO funcionario (nome, id_funcao, created_at) VALUES
('Carlos Silva', 'a1b2c3d4-0001-0001-0001-000000000001', NOW()),
('Juliana Costa', 'a1b2c3d4-0001-0001-0001-000000000001', NOW()),
('Lucas Martins', 'a1b2c3d4-0001-0001-0001-000000000001', NOW());
INSERT INTO funcionario (nome, id_funcao, created_at) VALUES
('Ana Pereira', 'a1b2c3d4-0001-0001-0001-000000000002', NOW()),
('Marcos Andrade', 'a1b2c3d4-0001-0001-0001-000000000002', NOW());
INSERT INTO funcionario (nome, id_funcao, created_at) VALUES
('Roberto Almeida', 'a1b2c3d4-0001-0001-0001-000000000003', NOW());
INSERT INTO tipo_chamado (id, descricao) VALUES
('c5d6e7f8-0002-0002-0002-000000000001', 'Dúvida'),
('c5d6e7f8-0002-0002-0002-000000000002', 'Incidente'),
('c5d6e7f8-0002-0002-0002-000000000003', 'Requisição de Serviço');
INSERT INTO situacao (id, valor, created_at) VALUES
('f8a9b0c1-0003-0003-0003-000000000001', 'Aberto', NOW()),
('f8a9b0c1-0003-0003-0003-000000000002', 'Em Andamento', NOW()),
('f8a9b0c1-0003-0003-0003-000000000003', 'Resolvido', NOW());
INSERT INTO chamado (atendente, requerente, tipo_chamado_id, situacao_id, created_at) VALUES
('Ana Pereira', 'Cliente A', 'c5d6e7f8-0002-0002-0002-000000000002', 'f8a9b0c1-0003-0003-0003-000000000001', NOW()),
('Marcos Andrade', 'Cliente B', 'c5d6e7f8-0002-0002-0002-000000000002', 'f8a9b0c1-0003-0003-0003-000000000002', NOW());
INSERT INTO chamado (atendente, requerente, tipo_chamado_id, situacao_id, created_at) VALUES
('Ana Pereira', 'Cliente C', 'c5d6e7f8-0002-0002-0002-000000000003', 'f8a9b0c1-0003-0003-0003-000000000001', NOW());
INSERT INTO chamado (atendente, requerente, tipo_chamado_id, situacao_id, created_at) VALUES
('Marcos Andrade', 'Cliente D', 'c5d6e7f8-0002-0002-0002-000000000001', 'f8a9b0c1-0003-0003-0003-000000000003', NOW());
INSERT INTO chamado (atendente, requerente, tipo_chamado_id, situacao_id, created_at) VALUES
('Ana Pereira', 'Cliente E', 'c5d6e7f8-0002-0002-0002-000000000002', 'f8a9b0c1-0003-0003-0003-000000000003', NOW());
