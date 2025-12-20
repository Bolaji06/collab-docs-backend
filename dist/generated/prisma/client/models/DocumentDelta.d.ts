import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model DocumentDelta
 *
 */
export type DocumentDeltaModel = runtime.Types.Result.DefaultSelection<Prisma.$DocumentDeltaPayload>;
export type AggregateDocumentDelta = {
    _count: DocumentDeltaCountAggregateOutputType | null;
    _avg: DocumentDeltaAvgAggregateOutputType | null;
    _sum: DocumentDeltaSumAggregateOutputType | null;
    _min: DocumentDeltaMinAggregateOutputType | null;
    _max: DocumentDeltaMaxAggregateOutputType | null;
};
export type DocumentDeltaAvgAggregateOutputType = {
    version: number | null;
};
export type DocumentDeltaSumAggregateOutputType = {
    version: number | null;
};
export type DocumentDeltaMinAggregateOutputType = {
    id: string | null;
    documentId: string | null;
    userId: string | null;
    version: number | null;
    timestamp: Date | null;
};
export type DocumentDeltaMaxAggregateOutputType = {
    id: string | null;
    documentId: string | null;
    userId: string | null;
    version: number | null;
    timestamp: Date | null;
};
export type DocumentDeltaCountAggregateOutputType = {
    id: number;
    documentId: number;
    userId: number;
    operations: number;
    version: number;
    timestamp: number;
    _all: number;
};
export type DocumentDeltaAvgAggregateInputType = {
    version?: true;
};
export type DocumentDeltaSumAggregateInputType = {
    version?: true;
};
export type DocumentDeltaMinAggregateInputType = {
    id?: true;
    documentId?: true;
    userId?: true;
    version?: true;
    timestamp?: true;
};
export type DocumentDeltaMaxAggregateInputType = {
    id?: true;
    documentId?: true;
    userId?: true;
    version?: true;
    timestamp?: true;
};
export type DocumentDeltaCountAggregateInputType = {
    id?: true;
    documentId?: true;
    userId?: true;
    operations?: true;
    version?: true;
    timestamp?: true;
    _all?: true;
};
export type DocumentDeltaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentDelta to aggregate.
     */
    where?: Prisma.DocumentDeltaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DocumentDeltas to fetch.
     */
    orderBy?: Prisma.DocumentDeltaOrderByWithRelationInput | Prisma.DocumentDeltaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DocumentDeltaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DocumentDeltas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DocumentDeltas.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DocumentDeltas
    **/
    _count?: true | DocumentDeltaCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DocumentDeltaAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DocumentDeltaSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DocumentDeltaMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DocumentDeltaMaxAggregateInputType;
};
export type GetDocumentDeltaAggregateType<T extends DocumentDeltaAggregateArgs> = {
    [P in keyof T & keyof AggregateDocumentDelta]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDocumentDelta[P]> : Prisma.GetScalarType<T[P], AggregateDocumentDelta[P]>;
};
export type DocumentDeltaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DocumentDeltaWhereInput;
    orderBy?: Prisma.DocumentDeltaOrderByWithAggregationInput | Prisma.DocumentDeltaOrderByWithAggregationInput[];
    by: Prisma.DocumentDeltaScalarFieldEnum[] | Prisma.DocumentDeltaScalarFieldEnum;
    having?: Prisma.DocumentDeltaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DocumentDeltaCountAggregateInputType | true;
    _avg?: DocumentDeltaAvgAggregateInputType;
    _sum?: DocumentDeltaSumAggregateInputType;
    _min?: DocumentDeltaMinAggregateInputType;
    _max?: DocumentDeltaMaxAggregateInputType;
};
export type DocumentDeltaGroupByOutputType = {
    id: string;
    documentId: string;
    userId: string;
    operations: runtime.JsonValue;
    version: number;
    timestamp: Date;
    _count: DocumentDeltaCountAggregateOutputType | null;
    _avg: DocumentDeltaAvgAggregateOutputType | null;
    _sum: DocumentDeltaSumAggregateOutputType | null;
    _min: DocumentDeltaMinAggregateOutputType | null;
    _max: DocumentDeltaMaxAggregateOutputType | null;
};
type GetDocumentDeltaGroupByPayload<T extends DocumentDeltaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DocumentDeltaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DocumentDeltaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DocumentDeltaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DocumentDeltaGroupByOutputType[P]>;
}>>;
export type DocumentDeltaWhereInput = {
    AND?: Prisma.DocumentDeltaWhereInput | Prisma.DocumentDeltaWhereInput[];
    OR?: Prisma.DocumentDeltaWhereInput[];
    NOT?: Prisma.DocumentDeltaWhereInput | Prisma.DocumentDeltaWhereInput[];
    id?: Prisma.StringFilter<"DocumentDelta"> | string;
    documentId?: Prisma.StringFilter<"DocumentDelta"> | string;
    userId?: Prisma.StringFilter<"DocumentDelta"> | string;
    operations?: Prisma.JsonFilter<"DocumentDelta">;
    version?: Prisma.IntFilter<"DocumentDelta"> | number;
    timestamp?: Prisma.DateTimeFilter<"DocumentDelta"> | Date | string;
    document?: Prisma.XOR<Prisma.DocumentScalarRelationFilter, Prisma.DocumentWhereInput>;
};
export type DocumentDeltaOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    operations?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    document?: Prisma.DocumentOrderByWithRelationInput;
};
export type DocumentDeltaWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DocumentDeltaWhereInput | Prisma.DocumentDeltaWhereInput[];
    OR?: Prisma.DocumentDeltaWhereInput[];
    NOT?: Prisma.DocumentDeltaWhereInput | Prisma.DocumentDeltaWhereInput[];
    documentId?: Prisma.StringFilter<"DocumentDelta"> | string;
    userId?: Prisma.StringFilter<"DocumentDelta"> | string;
    operations?: Prisma.JsonFilter<"DocumentDelta">;
    version?: Prisma.IntFilter<"DocumentDelta"> | number;
    timestamp?: Prisma.DateTimeFilter<"DocumentDelta"> | Date | string;
    document?: Prisma.XOR<Prisma.DocumentScalarRelationFilter, Prisma.DocumentWhereInput>;
}, "id">;
export type DocumentDeltaOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    operations?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    _count?: Prisma.DocumentDeltaCountOrderByAggregateInput;
    _avg?: Prisma.DocumentDeltaAvgOrderByAggregateInput;
    _max?: Prisma.DocumentDeltaMaxOrderByAggregateInput;
    _min?: Prisma.DocumentDeltaMinOrderByAggregateInput;
    _sum?: Prisma.DocumentDeltaSumOrderByAggregateInput;
};
export type DocumentDeltaScalarWhereWithAggregatesInput = {
    AND?: Prisma.DocumentDeltaScalarWhereWithAggregatesInput | Prisma.DocumentDeltaScalarWhereWithAggregatesInput[];
    OR?: Prisma.DocumentDeltaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DocumentDeltaScalarWhereWithAggregatesInput | Prisma.DocumentDeltaScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DocumentDelta"> | string;
    documentId?: Prisma.StringWithAggregatesFilter<"DocumentDelta"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"DocumentDelta"> | string;
    operations?: Prisma.JsonWithAggregatesFilter<"DocumentDelta">;
    version?: Prisma.IntWithAggregatesFilter<"DocumentDelta"> | number;
    timestamp?: Prisma.DateTimeWithAggregatesFilter<"DocumentDelta"> | Date | string;
};
export type DocumentDeltaCreateInput = {
    id?: string;
    userId: string;
    operations: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version: number;
    timestamp?: Date | string;
    document: Prisma.DocumentCreateNestedOneWithoutDeltasInput;
};
export type DocumentDeltaUncheckedCreateInput = {
    id?: string;
    documentId: string;
    userId: string;
    operations: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version: number;
    timestamp?: Date | string;
};
export type DocumentDeltaUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    operations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    document?: Prisma.DocumentUpdateOneRequiredWithoutDeltasNestedInput;
};
export type DocumentDeltaUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    documentId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    operations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentDeltaCreateManyInput = {
    id?: string;
    documentId: string;
    userId: string;
    operations: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version: number;
    timestamp?: Date | string;
};
export type DocumentDeltaUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    operations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentDeltaUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    documentId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    operations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentDeltaListRelationFilter = {
    every?: Prisma.DocumentDeltaWhereInput;
    some?: Prisma.DocumentDeltaWhereInput;
    none?: Prisma.DocumentDeltaWhereInput;
};
export type DocumentDeltaOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DocumentDeltaCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    operations?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
};
export type DocumentDeltaAvgOrderByAggregateInput = {
    version?: Prisma.SortOrder;
};
export type DocumentDeltaMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
};
export type DocumentDeltaMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
};
export type DocumentDeltaSumOrderByAggregateInput = {
    version?: Prisma.SortOrder;
};
export type DocumentDeltaCreateNestedManyWithoutDocumentInput = {
    create?: Prisma.XOR<Prisma.DocumentDeltaCreateWithoutDocumentInput, Prisma.DocumentDeltaUncheckedCreateWithoutDocumentInput> | Prisma.DocumentDeltaCreateWithoutDocumentInput[] | Prisma.DocumentDeltaUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?: Prisma.DocumentDeltaCreateOrConnectWithoutDocumentInput | Prisma.DocumentDeltaCreateOrConnectWithoutDocumentInput[];
    createMany?: Prisma.DocumentDeltaCreateManyDocumentInputEnvelope;
    connect?: Prisma.DocumentDeltaWhereUniqueInput | Prisma.DocumentDeltaWhereUniqueInput[];
};
export type DocumentDeltaUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: Prisma.XOR<Prisma.DocumentDeltaCreateWithoutDocumentInput, Prisma.DocumentDeltaUncheckedCreateWithoutDocumentInput> | Prisma.DocumentDeltaCreateWithoutDocumentInput[] | Prisma.DocumentDeltaUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?: Prisma.DocumentDeltaCreateOrConnectWithoutDocumentInput | Prisma.DocumentDeltaCreateOrConnectWithoutDocumentInput[];
    createMany?: Prisma.DocumentDeltaCreateManyDocumentInputEnvelope;
    connect?: Prisma.DocumentDeltaWhereUniqueInput | Prisma.DocumentDeltaWhereUniqueInput[];
};
export type DocumentDeltaUpdateManyWithoutDocumentNestedInput = {
    create?: Prisma.XOR<Prisma.DocumentDeltaCreateWithoutDocumentInput, Prisma.DocumentDeltaUncheckedCreateWithoutDocumentInput> | Prisma.DocumentDeltaCreateWithoutDocumentInput[] | Prisma.DocumentDeltaUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?: Prisma.DocumentDeltaCreateOrConnectWithoutDocumentInput | Prisma.DocumentDeltaCreateOrConnectWithoutDocumentInput[];
    upsert?: Prisma.DocumentDeltaUpsertWithWhereUniqueWithoutDocumentInput | Prisma.DocumentDeltaUpsertWithWhereUniqueWithoutDocumentInput[];
    createMany?: Prisma.DocumentDeltaCreateManyDocumentInputEnvelope;
    set?: Prisma.DocumentDeltaWhereUniqueInput | Prisma.DocumentDeltaWhereUniqueInput[];
    disconnect?: Prisma.DocumentDeltaWhereUniqueInput | Prisma.DocumentDeltaWhereUniqueInput[];
    delete?: Prisma.DocumentDeltaWhereUniqueInput | Prisma.DocumentDeltaWhereUniqueInput[];
    connect?: Prisma.DocumentDeltaWhereUniqueInput | Prisma.DocumentDeltaWhereUniqueInput[];
    update?: Prisma.DocumentDeltaUpdateWithWhereUniqueWithoutDocumentInput | Prisma.DocumentDeltaUpdateWithWhereUniqueWithoutDocumentInput[];
    updateMany?: Prisma.DocumentDeltaUpdateManyWithWhereWithoutDocumentInput | Prisma.DocumentDeltaUpdateManyWithWhereWithoutDocumentInput[];
    deleteMany?: Prisma.DocumentDeltaScalarWhereInput | Prisma.DocumentDeltaScalarWhereInput[];
};
export type DocumentDeltaUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: Prisma.XOR<Prisma.DocumentDeltaCreateWithoutDocumentInput, Prisma.DocumentDeltaUncheckedCreateWithoutDocumentInput> | Prisma.DocumentDeltaCreateWithoutDocumentInput[] | Prisma.DocumentDeltaUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?: Prisma.DocumentDeltaCreateOrConnectWithoutDocumentInput | Prisma.DocumentDeltaCreateOrConnectWithoutDocumentInput[];
    upsert?: Prisma.DocumentDeltaUpsertWithWhereUniqueWithoutDocumentInput | Prisma.DocumentDeltaUpsertWithWhereUniqueWithoutDocumentInput[];
    createMany?: Prisma.DocumentDeltaCreateManyDocumentInputEnvelope;
    set?: Prisma.DocumentDeltaWhereUniqueInput | Prisma.DocumentDeltaWhereUniqueInput[];
    disconnect?: Prisma.DocumentDeltaWhereUniqueInput | Prisma.DocumentDeltaWhereUniqueInput[];
    delete?: Prisma.DocumentDeltaWhereUniqueInput | Prisma.DocumentDeltaWhereUniqueInput[];
    connect?: Prisma.DocumentDeltaWhereUniqueInput | Prisma.DocumentDeltaWhereUniqueInput[];
    update?: Prisma.DocumentDeltaUpdateWithWhereUniqueWithoutDocumentInput | Prisma.DocumentDeltaUpdateWithWhereUniqueWithoutDocumentInput[];
    updateMany?: Prisma.DocumentDeltaUpdateManyWithWhereWithoutDocumentInput | Prisma.DocumentDeltaUpdateManyWithWhereWithoutDocumentInput[];
    deleteMany?: Prisma.DocumentDeltaScalarWhereInput | Prisma.DocumentDeltaScalarWhereInput[];
};
export type DocumentDeltaCreateWithoutDocumentInput = {
    id?: string;
    userId: string;
    operations: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version: number;
    timestamp?: Date | string;
};
export type DocumentDeltaUncheckedCreateWithoutDocumentInput = {
    id?: string;
    userId: string;
    operations: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version: number;
    timestamp?: Date | string;
};
export type DocumentDeltaCreateOrConnectWithoutDocumentInput = {
    where: Prisma.DocumentDeltaWhereUniqueInput;
    create: Prisma.XOR<Prisma.DocumentDeltaCreateWithoutDocumentInput, Prisma.DocumentDeltaUncheckedCreateWithoutDocumentInput>;
};
export type DocumentDeltaCreateManyDocumentInputEnvelope = {
    data: Prisma.DocumentDeltaCreateManyDocumentInput | Prisma.DocumentDeltaCreateManyDocumentInput[];
    skipDuplicates?: boolean;
};
export type DocumentDeltaUpsertWithWhereUniqueWithoutDocumentInput = {
    where: Prisma.DocumentDeltaWhereUniqueInput;
    update: Prisma.XOR<Prisma.DocumentDeltaUpdateWithoutDocumentInput, Prisma.DocumentDeltaUncheckedUpdateWithoutDocumentInput>;
    create: Prisma.XOR<Prisma.DocumentDeltaCreateWithoutDocumentInput, Prisma.DocumentDeltaUncheckedCreateWithoutDocumentInput>;
};
export type DocumentDeltaUpdateWithWhereUniqueWithoutDocumentInput = {
    where: Prisma.DocumentDeltaWhereUniqueInput;
    data: Prisma.XOR<Prisma.DocumentDeltaUpdateWithoutDocumentInput, Prisma.DocumentDeltaUncheckedUpdateWithoutDocumentInput>;
};
export type DocumentDeltaUpdateManyWithWhereWithoutDocumentInput = {
    where: Prisma.DocumentDeltaScalarWhereInput;
    data: Prisma.XOR<Prisma.DocumentDeltaUpdateManyMutationInput, Prisma.DocumentDeltaUncheckedUpdateManyWithoutDocumentInput>;
};
export type DocumentDeltaScalarWhereInput = {
    AND?: Prisma.DocumentDeltaScalarWhereInput | Prisma.DocumentDeltaScalarWhereInput[];
    OR?: Prisma.DocumentDeltaScalarWhereInput[];
    NOT?: Prisma.DocumentDeltaScalarWhereInput | Prisma.DocumentDeltaScalarWhereInput[];
    id?: Prisma.StringFilter<"DocumentDelta"> | string;
    documentId?: Prisma.StringFilter<"DocumentDelta"> | string;
    userId?: Prisma.StringFilter<"DocumentDelta"> | string;
    operations?: Prisma.JsonFilter<"DocumentDelta">;
    version?: Prisma.IntFilter<"DocumentDelta"> | number;
    timestamp?: Prisma.DateTimeFilter<"DocumentDelta"> | Date | string;
};
export type DocumentDeltaCreateManyDocumentInput = {
    id?: string;
    userId: string;
    operations: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version: number;
    timestamp?: Date | string;
};
export type DocumentDeltaUpdateWithoutDocumentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    operations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentDeltaUncheckedUpdateWithoutDocumentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    operations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentDeltaUncheckedUpdateManyWithoutDocumentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    operations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentDeltaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    documentId?: boolean;
    userId?: boolean;
    operations?: boolean;
    version?: boolean;
    timestamp?: boolean;
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["documentDelta"]>;
export type DocumentDeltaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    documentId?: boolean;
    userId?: boolean;
    operations?: boolean;
    version?: boolean;
    timestamp?: boolean;
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["documentDelta"]>;
export type DocumentDeltaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    documentId?: boolean;
    userId?: boolean;
    operations?: boolean;
    version?: boolean;
    timestamp?: boolean;
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["documentDelta"]>;
export type DocumentDeltaSelectScalar = {
    id?: boolean;
    documentId?: boolean;
    userId?: boolean;
    operations?: boolean;
    version?: boolean;
    timestamp?: boolean;
};
export type DocumentDeltaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "documentId" | "userId" | "operations" | "version" | "timestamp", ExtArgs["result"]["documentDelta"]>;
export type DocumentDeltaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
};
export type DocumentDeltaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
};
export type DocumentDeltaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
};
export type $DocumentDeltaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DocumentDelta";
    objects: {
        document: Prisma.$DocumentPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        documentId: string;
        userId: string;
        operations: runtime.JsonValue;
        version: number;
        timestamp: Date;
    }, ExtArgs["result"]["documentDelta"]>;
    composites: {};
};
export type DocumentDeltaGetPayload<S extends boolean | null | undefined | DocumentDeltaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DocumentDeltaPayload, S>;
export type DocumentDeltaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DocumentDeltaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DocumentDeltaCountAggregateInputType | true;
};
export interface DocumentDeltaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DocumentDelta'];
        meta: {
            name: 'DocumentDelta';
        };
    };
    /**
     * Find zero or one DocumentDelta that matches the filter.
     * @param {DocumentDeltaFindUniqueArgs} args - Arguments to find a DocumentDelta
     * @example
     * // Get one DocumentDelta
     * const documentDelta = await prisma.documentDelta.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentDeltaFindUniqueArgs>(args: Prisma.SelectSubset<T, DocumentDeltaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DocumentDeltaClient<runtime.Types.Result.GetResult<Prisma.$DocumentDeltaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DocumentDelta that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentDeltaFindUniqueOrThrowArgs} args - Arguments to find a DocumentDelta
     * @example
     * // Get one DocumentDelta
     * const documentDelta = await prisma.documentDelta.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentDeltaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DocumentDeltaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DocumentDeltaClient<runtime.Types.Result.GetResult<Prisma.$DocumentDeltaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DocumentDelta that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentDeltaFindFirstArgs} args - Arguments to find a DocumentDelta
     * @example
     * // Get one DocumentDelta
     * const documentDelta = await prisma.documentDelta.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentDeltaFindFirstArgs>(args?: Prisma.SelectSubset<T, DocumentDeltaFindFirstArgs<ExtArgs>>): Prisma.Prisma__DocumentDeltaClient<runtime.Types.Result.GetResult<Prisma.$DocumentDeltaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DocumentDelta that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentDeltaFindFirstOrThrowArgs} args - Arguments to find a DocumentDelta
     * @example
     * // Get one DocumentDelta
     * const documentDelta = await prisma.documentDelta.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentDeltaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DocumentDeltaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DocumentDeltaClient<runtime.Types.Result.GetResult<Prisma.$DocumentDeltaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DocumentDeltas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentDeltaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentDeltas
     * const documentDeltas = await prisma.documentDelta.findMany()
     *
     * // Get first 10 DocumentDeltas
     * const documentDeltas = await prisma.documentDelta.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const documentDeltaWithIdOnly = await prisma.documentDelta.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DocumentDeltaFindManyArgs>(args?: Prisma.SelectSubset<T, DocumentDeltaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocumentDeltaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DocumentDelta.
     * @param {DocumentDeltaCreateArgs} args - Arguments to create a DocumentDelta.
     * @example
     * // Create one DocumentDelta
     * const DocumentDelta = await prisma.documentDelta.create({
     *   data: {
     *     // ... data to create a DocumentDelta
     *   }
     * })
     *
     */
    create<T extends DocumentDeltaCreateArgs>(args: Prisma.SelectSubset<T, DocumentDeltaCreateArgs<ExtArgs>>): Prisma.Prisma__DocumentDeltaClient<runtime.Types.Result.GetResult<Prisma.$DocumentDeltaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DocumentDeltas.
     * @param {DocumentDeltaCreateManyArgs} args - Arguments to create many DocumentDeltas.
     * @example
     * // Create many DocumentDeltas
     * const documentDelta = await prisma.documentDelta.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DocumentDeltaCreateManyArgs>(args?: Prisma.SelectSubset<T, DocumentDeltaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DocumentDeltas and returns the data saved in the database.
     * @param {DocumentDeltaCreateManyAndReturnArgs} args - Arguments to create many DocumentDeltas.
     * @example
     * // Create many DocumentDeltas
     * const documentDelta = await prisma.documentDelta.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DocumentDeltas and only return the `id`
     * const documentDeltaWithIdOnly = await prisma.documentDelta.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DocumentDeltaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DocumentDeltaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocumentDeltaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DocumentDelta.
     * @param {DocumentDeltaDeleteArgs} args - Arguments to delete one DocumentDelta.
     * @example
     * // Delete one DocumentDelta
     * const DocumentDelta = await prisma.documentDelta.delete({
     *   where: {
     *     // ... filter to delete one DocumentDelta
     *   }
     * })
     *
     */
    delete<T extends DocumentDeltaDeleteArgs>(args: Prisma.SelectSubset<T, DocumentDeltaDeleteArgs<ExtArgs>>): Prisma.Prisma__DocumentDeltaClient<runtime.Types.Result.GetResult<Prisma.$DocumentDeltaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DocumentDelta.
     * @param {DocumentDeltaUpdateArgs} args - Arguments to update one DocumentDelta.
     * @example
     * // Update one DocumentDelta
     * const documentDelta = await prisma.documentDelta.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DocumentDeltaUpdateArgs>(args: Prisma.SelectSubset<T, DocumentDeltaUpdateArgs<ExtArgs>>): Prisma.Prisma__DocumentDeltaClient<runtime.Types.Result.GetResult<Prisma.$DocumentDeltaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DocumentDeltas.
     * @param {DocumentDeltaDeleteManyArgs} args - Arguments to filter DocumentDeltas to delete.
     * @example
     * // Delete a few DocumentDeltas
     * const { count } = await prisma.documentDelta.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DocumentDeltaDeleteManyArgs>(args?: Prisma.SelectSubset<T, DocumentDeltaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DocumentDeltas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentDeltaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentDeltas
     * const documentDelta = await prisma.documentDelta.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DocumentDeltaUpdateManyArgs>(args: Prisma.SelectSubset<T, DocumentDeltaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DocumentDeltas and returns the data updated in the database.
     * @param {DocumentDeltaUpdateManyAndReturnArgs} args - Arguments to update many DocumentDeltas.
     * @example
     * // Update many DocumentDeltas
     * const documentDelta = await prisma.documentDelta.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DocumentDeltas and only return the `id`
     * const documentDeltaWithIdOnly = await prisma.documentDelta.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends DocumentDeltaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DocumentDeltaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocumentDeltaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DocumentDelta.
     * @param {DocumentDeltaUpsertArgs} args - Arguments to update or create a DocumentDelta.
     * @example
     * // Update or create a DocumentDelta
     * const documentDelta = await prisma.documentDelta.upsert({
     *   create: {
     *     // ... data to create a DocumentDelta
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentDelta we want to update
     *   }
     * })
     */
    upsert<T extends DocumentDeltaUpsertArgs>(args: Prisma.SelectSubset<T, DocumentDeltaUpsertArgs<ExtArgs>>): Prisma.Prisma__DocumentDeltaClient<runtime.Types.Result.GetResult<Prisma.$DocumentDeltaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DocumentDeltas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentDeltaCountArgs} args - Arguments to filter DocumentDeltas to count.
     * @example
     * // Count the number of DocumentDeltas
     * const count = await prisma.documentDelta.count({
     *   where: {
     *     // ... the filter for the DocumentDeltas we want to count
     *   }
     * })
    **/
    count<T extends DocumentDeltaCountArgs>(args?: Prisma.Subset<T, DocumentDeltaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DocumentDeltaCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DocumentDelta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentDeltaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentDeltaAggregateArgs>(args: Prisma.Subset<T, DocumentDeltaAggregateArgs>): Prisma.PrismaPromise<GetDocumentDeltaAggregateType<T>>;
    /**
     * Group by DocumentDelta.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentDeltaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends DocumentDeltaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DocumentDeltaGroupByArgs['orderBy'];
    } : {
        orderBy?: DocumentDeltaGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DocumentDeltaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentDeltaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DocumentDelta model
     */
    readonly fields: DocumentDeltaFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DocumentDelta.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DocumentDeltaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    document<T extends Prisma.DocumentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DocumentDefaultArgs<ExtArgs>>): Prisma.Prisma__DocumentClient<runtime.Types.Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the DocumentDelta model
 */
export interface DocumentDeltaFieldRefs {
    readonly id: Prisma.FieldRef<"DocumentDelta", 'String'>;
    readonly documentId: Prisma.FieldRef<"DocumentDelta", 'String'>;
    readonly userId: Prisma.FieldRef<"DocumentDelta", 'String'>;
    readonly operations: Prisma.FieldRef<"DocumentDelta", 'Json'>;
    readonly version: Prisma.FieldRef<"DocumentDelta", 'Int'>;
    readonly timestamp: Prisma.FieldRef<"DocumentDelta", 'DateTime'>;
}
/**
 * DocumentDelta findUnique
 */
export type DocumentDeltaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentDelta
     */
    select?: Prisma.DocumentDeltaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DocumentDelta
     */
    omit?: Prisma.DocumentDeltaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentDeltaInclude<ExtArgs> | null;
    /**
     * Filter, which DocumentDelta to fetch.
     */
    where: Prisma.DocumentDeltaWhereUniqueInput;
};
/**
 * DocumentDelta findUniqueOrThrow
 */
export type DocumentDeltaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentDelta
     */
    select?: Prisma.DocumentDeltaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DocumentDelta
     */
    omit?: Prisma.DocumentDeltaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentDeltaInclude<ExtArgs> | null;
    /**
     * Filter, which DocumentDelta to fetch.
     */
    where: Prisma.DocumentDeltaWhereUniqueInput;
};
/**
 * DocumentDelta findFirst
 */
export type DocumentDeltaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentDelta
     */
    select?: Prisma.DocumentDeltaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DocumentDelta
     */
    omit?: Prisma.DocumentDeltaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentDeltaInclude<ExtArgs> | null;
    /**
     * Filter, which DocumentDelta to fetch.
     */
    where?: Prisma.DocumentDeltaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DocumentDeltas to fetch.
     */
    orderBy?: Prisma.DocumentDeltaOrderByWithRelationInput | Prisma.DocumentDeltaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DocumentDeltas.
     */
    cursor?: Prisma.DocumentDeltaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DocumentDeltas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DocumentDeltas.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DocumentDeltas.
     */
    distinct?: Prisma.DocumentDeltaScalarFieldEnum | Prisma.DocumentDeltaScalarFieldEnum[];
};
/**
 * DocumentDelta findFirstOrThrow
 */
export type DocumentDeltaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentDelta
     */
    select?: Prisma.DocumentDeltaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DocumentDelta
     */
    omit?: Prisma.DocumentDeltaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentDeltaInclude<ExtArgs> | null;
    /**
     * Filter, which DocumentDelta to fetch.
     */
    where?: Prisma.DocumentDeltaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DocumentDeltas to fetch.
     */
    orderBy?: Prisma.DocumentDeltaOrderByWithRelationInput | Prisma.DocumentDeltaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DocumentDeltas.
     */
    cursor?: Prisma.DocumentDeltaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DocumentDeltas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DocumentDeltas.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DocumentDeltas.
     */
    distinct?: Prisma.DocumentDeltaScalarFieldEnum | Prisma.DocumentDeltaScalarFieldEnum[];
};
/**
 * DocumentDelta findMany
 */
export type DocumentDeltaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentDelta
     */
    select?: Prisma.DocumentDeltaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DocumentDelta
     */
    omit?: Prisma.DocumentDeltaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentDeltaInclude<ExtArgs> | null;
    /**
     * Filter, which DocumentDeltas to fetch.
     */
    where?: Prisma.DocumentDeltaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DocumentDeltas to fetch.
     */
    orderBy?: Prisma.DocumentDeltaOrderByWithRelationInput | Prisma.DocumentDeltaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DocumentDeltas.
     */
    cursor?: Prisma.DocumentDeltaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DocumentDeltas from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DocumentDeltas.
     */
    skip?: number;
    distinct?: Prisma.DocumentDeltaScalarFieldEnum | Prisma.DocumentDeltaScalarFieldEnum[];
};
/**
 * DocumentDelta create
 */
export type DocumentDeltaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentDelta
     */
    select?: Prisma.DocumentDeltaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DocumentDelta
     */
    omit?: Prisma.DocumentDeltaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentDeltaInclude<ExtArgs> | null;
    /**
     * The data needed to create a DocumentDelta.
     */
    data: Prisma.XOR<Prisma.DocumentDeltaCreateInput, Prisma.DocumentDeltaUncheckedCreateInput>;
};
/**
 * DocumentDelta createMany
 */
export type DocumentDeltaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentDeltas.
     */
    data: Prisma.DocumentDeltaCreateManyInput | Prisma.DocumentDeltaCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DocumentDelta createManyAndReturn
 */
export type DocumentDeltaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentDelta
     */
    select?: Prisma.DocumentDeltaSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DocumentDelta
     */
    omit?: Prisma.DocumentDeltaOmit<ExtArgs> | null;
    /**
     * The data used to create many DocumentDeltas.
     */
    data: Prisma.DocumentDeltaCreateManyInput | Prisma.DocumentDeltaCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentDeltaIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * DocumentDelta update
 */
export type DocumentDeltaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentDelta
     */
    select?: Prisma.DocumentDeltaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DocumentDelta
     */
    omit?: Prisma.DocumentDeltaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentDeltaInclude<ExtArgs> | null;
    /**
     * The data needed to update a DocumentDelta.
     */
    data: Prisma.XOR<Prisma.DocumentDeltaUpdateInput, Prisma.DocumentDeltaUncheckedUpdateInput>;
    /**
     * Choose, which DocumentDelta to update.
     */
    where: Prisma.DocumentDeltaWhereUniqueInput;
};
/**
 * DocumentDelta updateMany
 */
export type DocumentDeltaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentDeltas.
     */
    data: Prisma.XOR<Prisma.DocumentDeltaUpdateManyMutationInput, Prisma.DocumentDeltaUncheckedUpdateManyInput>;
    /**
     * Filter which DocumentDeltas to update
     */
    where?: Prisma.DocumentDeltaWhereInput;
    /**
     * Limit how many DocumentDeltas to update.
     */
    limit?: number;
};
/**
 * DocumentDelta updateManyAndReturn
 */
export type DocumentDeltaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentDelta
     */
    select?: Prisma.DocumentDeltaSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DocumentDelta
     */
    omit?: Prisma.DocumentDeltaOmit<ExtArgs> | null;
    /**
     * The data used to update DocumentDeltas.
     */
    data: Prisma.XOR<Prisma.DocumentDeltaUpdateManyMutationInput, Prisma.DocumentDeltaUncheckedUpdateManyInput>;
    /**
     * Filter which DocumentDeltas to update
     */
    where?: Prisma.DocumentDeltaWhereInput;
    /**
     * Limit how many DocumentDeltas to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentDeltaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * DocumentDelta upsert
 */
export type DocumentDeltaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentDelta
     */
    select?: Prisma.DocumentDeltaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DocumentDelta
     */
    omit?: Prisma.DocumentDeltaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentDeltaInclude<ExtArgs> | null;
    /**
     * The filter to search for the DocumentDelta to update in case it exists.
     */
    where: Prisma.DocumentDeltaWhereUniqueInput;
    /**
     * In case the DocumentDelta found by the `where` argument doesn't exist, create a new DocumentDelta with this data.
     */
    create: Prisma.XOR<Prisma.DocumentDeltaCreateInput, Prisma.DocumentDeltaUncheckedCreateInput>;
    /**
     * In case the DocumentDelta was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DocumentDeltaUpdateInput, Prisma.DocumentDeltaUncheckedUpdateInput>;
};
/**
 * DocumentDelta delete
 */
export type DocumentDeltaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentDelta
     */
    select?: Prisma.DocumentDeltaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DocumentDelta
     */
    omit?: Prisma.DocumentDeltaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentDeltaInclude<ExtArgs> | null;
    /**
     * Filter which DocumentDelta to delete.
     */
    where: Prisma.DocumentDeltaWhereUniqueInput;
};
/**
 * DocumentDelta deleteMany
 */
export type DocumentDeltaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentDeltas to delete
     */
    where?: Prisma.DocumentDeltaWhereInput;
    /**
     * Limit how many DocumentDeltas to delete.
     */
    limit?: number;
};
/**
 * DocumentDelta without action
 */
export type DocumentDeltaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentDelta
     */
    select?: Prisma.DocumentDeltaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DocumentDelta
     */
    omit?: Prisma.DocumentDeltaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentDeltaInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=DocumentDelta.d.ts.map