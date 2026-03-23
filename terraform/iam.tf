#Creating exec role to prep
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "project-ecs-execution-role"

  assume_role_policy = jsonencode({
    Version = "2008-10-17"
    Statement = [
      {
        Sid    = ""
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Name = "project-ecs-execution-role"
  }
}

#Attaches policy (AWS Managed) to the role. Gives ECR pull permissions. 
resource "aws_iam_role_policy_attachment" "attach" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}