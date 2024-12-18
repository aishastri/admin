export async function fetchUserData() {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/getMe`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (!response.ok) throw new Error('Failed to fetch user data')
    return await response.json()
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}
