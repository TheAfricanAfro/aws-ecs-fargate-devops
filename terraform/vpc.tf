resource "aws_vpc" "project_vpc" {
  cidr_block       = var.vpc_cidr
  instance_tenancy = var.vpc_instance_tenancy

  tags = {
    Name = "project-VPC"
  }
}

#Creates a public subnet in us-east-2 az a
resource "aws_subnet" "project_vpc_subnet_public_2a" {
  vpc_id                  = aws_vpc.project_vpc.id
  cidr_block              = var.subnet_cidr_public_2a
  availability_zone       = var.availability_zone_2a
  map_public_ip_on_launch = true

  tags = {
    Name = "project-vpc-subnet-public-2a"
  }
}

#Creates a private subnet in us-east-2 az a
resource "aws_subnet" "project_vpc_subnet_private_2a" {
  vpc_id            = aws_vpc.project_vpc.id
  cidr_block        = var.subnet_cidr_private_2a
  availability_zone = var.availability_zone_2a

  tags = {
    Name = "project-vpc-subnet-private-2a"
  }
}

#Creates a public subnet in us-east-2 az b
resource "aws_subnet" "project_vpc_subnet_public_2b" {
  vpc_id                  = aws_vpc.project_vpc.id
  cidr_block              = var.subnet_cidr_public_2b
  availability_zone       = var.availability_zone_2b
  map_public_ip_on_launch = true

  tags = {
    Name = "project-vpc-subnet-public-2b"
  }
}

#Creates a private subnet in us-east-2 az b
resource "aws_subnet" "project_vpc_subnet_private_2b" {
  vpc_id            = aws_vpc.project_vpc.id
  cidr_block        = var.subnet_cidr_private_2b
  availability_zone = var.availability_zone_2b

  tags = {
    Name = "project-vpc-subnet-private-2b"
  }
}


#Creates an igw 
resource "aws_internet_gateway" "project_vpc_igw" {
  vpc_id = aws_vpc.project_vpc.id

  tags = {
    Name = "project-vpc-igw"
  }
}

#Creates an elastic ip for Nat GW in AZ A
resource "aws_eip" "nat_gw_2a" {
  domain = "vpc"

  tags = {
    Name = "project-nat-eip-2a"
  }
}

#Creates an elastic ip for Nat GW in AZ B
resource "aws_eip" "nat_gw_2b" {
  domain = "vpc"

  tags = {
    Name = "project-nat-eip-2b"
  }
}


#Creates a NAT GW in AZ A
resource "aws_nat_gateway" "project_nat_gw_2a" {
  allocation_id = aws_eip.nat_gw_2a.id
  subnet_id     = aws_subnet.project_vpc_subnet_public_2a.id

  tags = {
    Name = "project-nat-gw-2a"
  }

  # Terraform Documentation advises to include depends_on, in order to ensure proper ordering
  depends_on = [aws_internet_gateway.project_vpc_igw]
}

#Creates a NAT GW in AZ B
resource "aws_nat_gateway" "project_nat_gw_2b" {
  allocation_id = aws_eip.nat_gw_2b.id
  subnet_id     = aws_subnet.project_vpc_subnet_public_2b.id

  tags = {
    Name = "project-nat-gw-2b"
  }

  # Terraform Documentation advises to include depends_on, in order to ensure proper ordering
  depends_on = [aws_internet_gateway.project_vpc_igw]
}


# Creates a RT for our public subnets
resource "aws_route_table" "project_public_routing_table" {
  vpc_id = aws_vpc.project_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.project_vpc_igw.id
  }


  tags = {
    Name = "project-public-routing-table"
  }
}


#RT for Private Subnet in AZ a
resource "aws_route_table" "rt_private_2a" {
  vpc_id = aws_vpc.project_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.project_nat_gw_2a.id
  }


  tags = {
    Name = "project-private-routing-table-2a"
  }
}

#RT for Private Subnet in AZ b
resource "aws_route_table" "rt_private_2b" {
  vpc_id = aws_vpc.project_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.project_nat_gw_2b.id
  }

  tags = {
    Name = "project-private-routing-table-2b"
  }
}

#Creates RT association for public and private rt. 
resource "aws_route_table_association" "public_2a" {
  subnet_id      = aws_subnet.project_vpc_subnet_public_2a.id
  route_table_id = aws_route_table.project_public_routing_table.id
}

resource "aws_route_table_association" "private_2a" {
  subnet_id      = aws_subnet.project_vpc_subnet_private_2a.id
  route_table_id = aws_route_table.rt_private_2a.id
}

resource "aws_route_table_association" "public_2b" {
  subnet_id      = aws_subnet.project_vpc_subnet_public_2b.id
  route_table_id = aws_route_table.project_public_routing_table.id
}

resource "aws_route_table_association" "private_2b" {
  subnet_id      = aws_subnet.project_vpc_subnet_private_2b.id
  route_table_id = aws_route_table.rt_private_2b.id
}