(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_lib_54d2b216._.js", {

"[project]/src/lib/db/supabaseClient.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "supabase": (()=>supabase)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-client] (ecmascript) <locals>");
;
// Environment variables
const supabaseUrl = ("TURBOPACK compile-time value", "http://localhost:54321");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTl9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0");
// Create a mock client for development when env vars are not available
const createMockClient = ()=>{
    console.warn('Supabase URL and/or Anon Key not found. Using mock client.');
    return {
        auth: {
            signInWithPassword: async ()=>({
                    data: {
                        session: null
                    },
                    error: null
                }),
            signUp: async ()=>({
                    data: {
                        session: null
                    },
                    error: null
                }),
            signOut: async ()=>({
                    error: null
                }),
            resetPasswordForEmail: async ()=>({
                    error: null
                }),
            updateUser: async ()=>({
                    error: null
                }),
            getSession: async ()=>({
                    data: {
                        session: null
                    },
                    error: null
                })
        }
    };
};
const supabase = ("TURBOPACK compile-time truthy", 1) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false
    }
}) : ("TURBOPACK unreachable", undefined);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/Redux/auth/actions/authActions.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "authActions": (()=>authActions),
    "loginAction": (()=>loginAction),
    "logoutAction": (()=>logoutAction),
    "registerAction": (()=>registerAction),
    "resetPasswordAction": (()=>resetPasswordAction),
    "resetPasswordRequestAction": (()=>resetPasswordRequestAction)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/supabaseClient.ts [app-client] (ecmascript)");
;
;
const loginAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/login', async (credentials, { rejectWithValue })=>{
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password
        });
        if (error) throw new Error(error.message);
        return {
            idToken: data.session?.access_token || null,
            refreshToken: data.session?.refresh_token || null
        };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const registerAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/register', async (userData, { rejectWithValue })=>{
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signUp({
            email: userData.email,
            password: userData.password
        });
        if (error) throw new Error(error.message);
        return {
            idToken: data.session?.access_token || null,
            refreshToken: data.session?.refresh_token || null
        };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const logoutAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/logout', async (_, { rejectWithValue })=>{
    try {
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        if (error) throw new Error(error.message);
        return null;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const resetPasswordRequestAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/resetPasswordRequest', async (email, { rejectWithValue })=>{
    try {
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:3000/reset-password'
        });
        if (error) throw new Error(error.message);
        return null;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const resetPasswordAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/resetPassword', async (data, { rejectWithValue })=>{
    try {
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.updateUser({
            password: data.newPassword
        });
        if (error) throw new Error(error.message);
        // After password update, we need to get the session
        const { data: sessionData, error: sessionError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
        if (sessionError) throw new Error(sessionError.message);
        return {
            idToken: sessionData.session?.access_token || null,
            refreshToken: sessionData.session?.refresh_token || null
        };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const authActions = {
    loginAction,
    registerAction,
    logoutAction,
    resetPasswordRequestAction,
    resetPasswordAction
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/Redux/auth/slices/authSlice.ts [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/Redux/auth/actions/authActions.ts [app-client] (ecmascript)");
;
;
const initialState = {
    idToken: null,
    refreshToken: null,
    loading: false,
    error: null,
    sessionId: null
};
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginAction"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginAction"].fulfilled, (state, action)=>{
            state.loading = false;
            state.idToken = action.payload.idToken;
            state.refreshToken = action.payload.refreshToken;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginAction"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerAction"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerAction"].fulfilled, (state, action)=>{
            state.loading = false;
            state.idToken = action.payload.idToken;
            state.refreshToken = action.payload.refreshToken;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerAction"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutAction"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutAction"].fulfilled, (state)=>{
            state.loading = false;
            state.idToken = null;
            state.refreshToken = null;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutAction"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetPasswordRequestAction"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetPasswordRequestAction"].fulfilled, (state)=>{
            state.loading = false;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetPasswordRequestAction"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetPasswordAction"].pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetPasswordAction"].fulfilled, (state, action)=>{
            state.loading = false;
            state.idToken = action.payload.idToken;
            state.refreshToken = action.payload.refreshToken;
            state.error = null;
        }).addCase(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetPasswordAction"].rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        });
    }
});
const __TURBOPACK__default__export__ = authSlice.reducer;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/Redux/auth/slices/authSlice.ts [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$actions$2f$authActions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/Redux/auth/actions/authActions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/Redux/auth/slices/authSlice.ts [app-client] (ecmascript) <locals>");
}}),
"[project]/src/lib/Redux/store.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "store": (()=>store),
    "useAppDispatch": (()=>useAppDispatch),
    "useAppSelector": (()=>useAppSelector)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/lib/Redux/auth/slices/authSlice.ts [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/Redux/auth/slices/authSlice.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$auth$2f$slices$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    }
});
;
const useAppDispatch = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
};
_s(useAppDispatch, "jI3HA1r1Cumjdbu14H7G+TUj798=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"]
    ];
});
const useAppSelector = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/Redux/providers.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Providers": (()=>Providers)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/Redux/store.ts [app-client] (ecmascript)");
'use client';
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$Redux$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/Redux/providers.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_lib_54d2b216._.js.map