
resource "aws_security_group" "ecs_sg" {
  vpc_id = aws_vpc.aws-vpc.id

  ingress {
    from_port   = 80 # TODO: update to come from variable
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# resource "aws_launch_configuration" "ecs_launch_config" {
#   image_id             = var.ec2_ami_id
#   iam_instance_profile = aws_iam_instance_profile.ecs-agent.name
#   security_groups      = [aws_security_group.service_security_group.id]
#   user_data            = "#!/bin/bash\necho ECS_CLUSTER=${var.app_name}-${var.app_environment}-cluster >> /etc/ecs/ecs.config"
#   instance_type        = "t2.micro"

#   lifecycle {
#     create_before_destroy = true
#   }
# }


resource "aws_launch_template" "ecs_launch_template" {
  name_prefix = var.app_name
  iam_instance_profile {
    name = aws_iam_instance_profile.ecs-agent.name
  }
  network_interfaces {
    associate_public_ip_address = true
    security_groups             = [aws_security_group.service_security_group.id]
  }

  user_data = (base64encode(templatefile("userdata.tpl", {
    tf_cluster_name = "${var.app_name}-${var.app_environment}-cluster"
  })))
  image_id      = var.ec2_ami_id
  instance_type = "t2.micro"
}

resource "aws_autoscaling_group" "failure_analysis_ecs_asg" {
  name                = "${var.app_name}-${aws_launch_template.ecs_launch_template.name}-asg"
  vpc_zone_identifier = aws_subnet.public[*].id
  launch_template {
    id      = aws_launch_template.ecs_launch_template.id
    version = "$Latest"
  }

  desired_capacity          = var.ec2_instance_count
  min_size                  = 1
  max_size                  = 4
  health_check_grace_period = 300
  health_check_type         = "EC2"

  lifecycle {
    create_before_destroy = true
  }
}
