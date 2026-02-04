export default function CartPage() {
  const theadData = ['Products', 'Price', 'Quanity', 'Total'];
  
  return (
    <div className="mt-13">
      <div className="relative flex flex-col w-[782px] ">
        <table className="w-full text-left table-auto min-w-max">
          <thead className="border-b">
            <tr>
              <th className="text-card-foreground pb-4 font-medium w-78">Products</th>
              <th className="text-card-foreground pb-4 font-medium w-36">Price</th>
              <th className="text-card-foreground pb-4 font-medium w-41">Quanity</th>
              <th className="text-card-foreground pb-4 font-medium w-40">Total</th>
            </tr>
          </thead>
          <tbody className="border-spacing-y-3">
            <tr>

              <td className="mt-3 border-b border-blue-gray-50">
                
              </td>
    
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
