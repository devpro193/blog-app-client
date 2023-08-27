import { NextResponse } from 'next/server'

export function handle(request) {
	// Get a cookie
	let data = request.cookies.get('parallelVortex')?.value

	// Get all cookies
	request.cookies.getAll()

	// To change a cookie, first create a response
	const response = NextResponse.next()

	return response
}