package com.it.berdeja.simplePhysics;

import java.util.Scanner;

public class CircleCircumference {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.print("Please, enter circle radius: ");
		int radius = sc.nextInt();
		double circleCircumference = 2 * Math.PI * radius;

		System.out.println("Circle circumference is: " + circleCircumference);
	}
}
