export async function hashPassword(password: any) {
	const hashBuffer = await crypto.subtle.digest('MD5', new TextEncoder().encode(password));
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	
	return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}