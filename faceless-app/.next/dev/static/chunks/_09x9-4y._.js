(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/pocketbase.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "pb",
    ()=>pb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pocketbase$2f$dist$2f$pocketbase$2e$es$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pocketbase/dist/pocketbase.es.mjs [app-client] (ecmascript)");
;
// Địa chỉ PocketBase Server (sẽ lấy từ biến môi trường NEXT_PUBLIC_POCKETBASE_URL, mặc định là http://127.0.0.1:8090)
const pbUrl = ("TURBOPACK compile-time value", "http://127.0.0.1:8090") || 'http://127.0.0.1:8090';
const pb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pocketbase$2f$dist$2f$pocketbase$2e$es$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](pbUrl);
// (Tùy chọn) Có thể tắt tính năng auto cancellation nếu bạn muốn các request giống nhau có thể gửi đi đồng thời
pb.autoCancellation(false);
const __TURBOPACK__default__export__ = pb;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/context/AuthContext.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pocketbase.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAuthReady, setIsAuthReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            setUser(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.model);
            setIsAuthenticated(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.isValid);
            setIsAuthReady(true);
            // Lắng nghe thay đổi trạng thái đăng nhập từ PocketBase
            const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.onChange({
                "AuthProvider.useEffect.unsubscribe": (token, model)=>{
                    setUser(model);
                    setIsAuthenticated(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.isValid);
                }
            }["AuthProvider.useEffect.unsubscribe"]);
            return ({
                "AuthProvider.useEffect": ()=>{
                    if (typeof unsubscribe === 'function') {
                        unsubscribe();
                    }
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], []);
    const login = async (email, password)=>{
        try {
            const authData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].collection('users').authWithPassword(email, password);
            return {
                success: true,
                data: authData
            };
        } catch (err) {
            console.error(err);
            return {
                success: false,
                error: err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.'
            };
        }
    };
    const register = async (name, email, password, passwordConfirm)=>{
        try {
            const data = {
                name,
                email,
                password,
                passwordConfirm,
                role: 'user'
            };
            // Gửi request tạo tài khoản tới PocketBase
            const record = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].collection('users').create(data);
            return {
                success: true,
                data: record
            };
        } catch (err) {
            console.error(err);
            let errorMessage = 'Đăng ký thất bại.';
            // Trích xuất lỗi cụ thể từ PocketBase trả về
            if (err.response?.data) {
                const fieldErrors = Object.entries(err.response.data).map(([field, info])=>`${field}: ${info.message}`).join(' | ');
                if (fieldErrors) {
                    errorMessage = fieldErrors;
                }
            } else if (err.message) {
                errorMessage = err.message;
            }
            return {
                success: false,
                error: errorMessage
            };
        }
    };
    const logout = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].authStore.clear(); // Xoá session
        setUser(null);
        setIsAuthenticated(false);
        setIsAuthReady(true);
    };
    const forgotPassphrase = async (email)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pocketbase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pb"].collection('users').requestPasswordReset(email);
            return {
                success: true,
                message: 'Quy trình khôi phục đã được gửi đến địa chỉ email của bạn.'
            };
        } catch (err) {
            return {
                success: false,
                error: err.message || 'Lỗi gửi yêu cầu khôi phục.'
            };
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isAuthenticated,
            isAuthReady,
            login,
            register,
            logout,
            forgotPassphrase
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AuthContext.jsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "F7kEUXwF8shtRb37/r0q9RH+XcY=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const __TURBOPACK__default__export__ = AuthContext;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/providers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.jsx [app-client] (ecmascript)");
'use client';
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/app/providers.js",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_09x9-4y._.js.map