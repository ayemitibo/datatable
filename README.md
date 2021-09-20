### Review Instructions

To run the app locally please clone the repo and install the dependencies with:

```bash
$ npm run install
```

Then serve the app (likely will be served at `localhost:3000`, check your terminal):

```bash
$ npm run dev
```

To run the unit tests use this command:

```bash
$ npm run test
```

### Usage
```
/views/Index.vue
```

```
    <VTable :options="options" :data="deals">
      <template #dealName="{ value }">
        <span
          class="
            inline-flex
            items-center
            justify-center
            px-2
            py-1
            text-xs
            font-bold
            leading-none
            text-red-100
            bg-red-600
            rounded-full
          "
          >Deal</span
        >
        {{ value }}
      </template>
    </VTable>
```


```
 options: {
        headings: {
          issuer: { title: "Issuer", priority: 1 },
          dealName: { title: "deal Name", priority: 1 },
          industry: { title: "Industry", priority: 1 },
          agent: "Agent",
        },
      },
```
