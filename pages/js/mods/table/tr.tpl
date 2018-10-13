{{each data as obj i}}
<tr>
    <td style="padding: 12px 26px;">
        <div class="cell">
           <div class="checkbox check" data-id="{{obj.id}}"></div>
        </div>
    </td>
    {{each obj as item}}
    <td>
        <div class="cell" style="width: 175px;">{{item}}</div>
    </td>
    {{/each}}
    <td>
        <div class="cell" style="width: 800px;">
        	<a href="javascript:;" class="modify" data-id="{{obj.id}}">修改</a>
        	<a href="javascript:;" style="margin-right: 26px;margin-left: 32px;" data-id="{{obj.id}}">解析协议</a>
        	<!-- <a href="javascript:;" data-id="{{obj.id}}">批量调试</a> -->
        	<a href="javascript:;"  data-id="{{obj.id}}">卸载</a>
        </div>
    </td>
    <td>
        <div class="cell" style="width: 175px;">
        	<a href="javascript:;" class="delete" data-id="{{obj.id}}">删除</a>
        </div>
    </td>
</tr>
{{/each}}