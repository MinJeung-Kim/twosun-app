export const formatData = async (response: Response) => {
    const text = await response.text();

    const jsCode = text.replace(/^export const mockPosts\s*=\s*/, "");
    return new Function(`return ${jsCode}`)();
}