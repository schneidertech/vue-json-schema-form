const beListConfig = [];

//
export default function guards(router) {
    router.beforeEach(async (to, from, next) => {
        const beGuardsList = [...beListConfig];

        //
        //  '' || 'next' next();
        // catch

        while (beGuardsList.length > 0) {
            const handler = beGuardsList.shift();
            const isRunInterceptor = handler.valid ? handler.valid(to, from) : true;

            if (isRunInterceptor) {
                try {
                    const nextValue = await handler(to, from); // eslint-disable-line
                    if (nextValue !== undefined) {
                        next(...(nextValue === '' || nextValue === 'next' ? [] : [nextValue]));
                        return;
                    }
                } catch (e) {
                    // reject  throw error
                    next(false);
                    return;
                }
            }
        }

        //
        next();
    });

    // after each
    router.afterEach((to, from) => {
        const baseTitle = 'vue-json-schema-form';
        if (to.meta.title) {
            document.title = `${to.meta.title} | ${baseTitle}`;
        }
    });
}
