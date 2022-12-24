package com.it.berdeja.simplePhysics;

import java.util.Scanner;

public class AreaofTriangle {
	
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		System.out.print("Please, enter A side of a triangle: ");
		int a = sc.nextInt();
		
		System.out.print("Please, enter B side of a triangle: ");
		int b = sc.nextInt();
		
		System.out.print("Please, enter C side of a triangle: ");
		int c = sc.nextInt();
		
		float p = (float)(a + b + c)/2;
		if (p <= a || p <= b || p <= c) {
			System.out.println("NaN");
		} else {
			double triangleArea = Math.sqrt(p * (p - a) * (p - b) * (p - c));
			System.out.println("Triangle area is: " + triangleArea);			
		}
	}

}